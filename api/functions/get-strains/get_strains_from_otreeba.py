import requests
import os
import logging
import time
import google.cloud.logging

from google.cloud import bigquery
from flask import Flask

"""
Loads all Otreeba strains into a BigQuery table.
Operation is append only, so much first clear table:

DELETE FROM `project.dataset.table` WHERE true;
"""

PROJECT_ID = os.environ['PROJECT_ID']
BQ_DATASET_NAME = os.environ['BQ_DATASET_NAME']
BQ_TABLE_NAME = os.environ['BQ_TABLE_NAME']

# API max is 50 https://api.otreeba.com/swagger/#/Strains/getStrains
MAX_RESULTS_PER_PAGE = int(os.getenv('MAX_RESULTS_PER_PAGE', 50))
START_AT_PAGE = int(os.getenv('START_AT_PAGE', 1))
SORT = '-createdAt'
NUM_PAGES_TO_PROCESS = int(os.getenv('NUM_PAGES_TO_PROCESS', 1))

# In order to not overload the API and risk getting block-listed
SLEEP_SECONDS = int(os.getenv('SLEEP_SECONDS', 45))

OTREEBA_API_ORIGIN = 'https://api.otreeba.com/v1'
STRAINS_API_PATH = '/strains'
STRAINS_API_URL = "%s%s" % (OTREEBA_API_ORIGIN, STRAINS_API_PATH)

LOGGING_CLIENT = google.cloud.logging.Client()
LOGGING_CLIENT.setup_logging()

def get_otreeba_strains(page_num):
    params = {
        'count': MAX_RESULTS_PER_PAGE,
        'sort': SORT,
        'page': page_num }
    response = requests.get(STRAINS_API_URL, params=params)
    logging.info("Got response %s" % response)
    response_json = response.json()
    
    if 'data' in response_json:
        return response_json['data']
    else:
        raise Exception("Invalid response format for %s" % response)

# https://googleapis.dev/python/bigquery/latest/generated/google.cloud.bigquery.client.Client.html
def save_strains_to_bigquery(strains):
    # Construct a BigQuery client object.
    client = bigquery.Client()
    bq_id = '%s.%s.%s' % (PROJECT_ID, BQ_DATASET_NAME, BQ_TABLE_NAME)
    errors = client.insert_rows_json(
            bq_id,
            strains)

    if errors:
        logging.error("Error inserting strain into BigQuery: %s" % errors)

def convert_otreeba_strain_to_cluutch_strain(otreeba_strain):
    return {
       'name':  otreeba_strain['name'],
       'ocpc': otreeba_strain['ocpc'],
       'url': otreeba_strain['url'] or None,
       'image_url': otreeba_strain['image'],
       'seed_company_name': otreeba_strain['seedCompany']['name'] or None,
       'seed_company_ocpc': otreeba_strain['seedCompany']['ocpc'] or None,
       'genetics': otreeba_strain['genetics']['names'] or None,
       'genetics_cross_ocpc': otreeba_strain['genetics']['ocpc'] or None}

def convert_otreeba_strains_to_cluutch_strains(otreeba_strains):
    cluutch_strains = map(convert_otreeba_strain_to_cluutch_strain, otreeba_strains)
    return list(cluutch_strains)

# def get_all_strains(event, context=None):
def get_all_strains():
    logging.info("Going to fetch and load all strains from Otreeba.")

    page_count = START_AT_PAGE
    while NUM_PAGES_TO_PROCESS < 0 or page_count <= NUM_PAGES_TO_PROCESS:
        logging.info("Processing page %s" % page_count)
        otreeba_strains = get_otreeba_strains(page_count)
        cluutch_strains = convert_otreeba_strains_to_cluutch_strains(otreeba_strains)
        save_strains_to_bigquery(cluutch_strains)
        
        logging.info(cluutch_strains)
        logging.info("Processed page %s" % page_count)

        if len(cluutch_strains) < MAX_RESULTS_PER_PAGE:
            logging.info("Finished processing all strains from Otreeba API.")
            break
        else:
            page_count += 1
            time.sleep(SLEEP_SECONDS)

##########
# Flask app

app = Flask(__name__)

@app.route("/")
def get_all_strains_endpoint():
    logging.info("Flask endpoint hit")
    get_all_strains()
    return True

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))