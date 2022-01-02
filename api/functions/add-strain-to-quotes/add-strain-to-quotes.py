# From: https://stackoverflow.com/questions/68752082/how-large-a-file-size-from-gcs-can-handle-in-cloud-function

# google-cloud-bigquery==2.28.1
# google-cloud-storage==1.42.2
# google-cloud-logging==2.7.0

import logging
import os
import csv
from google.cloud import bigquery, storage
import google.cloud.logging

QUOTES_BUCKET_NAME = os.environ['QUOTES_BUCKET_NAME']
QUOTES_ARCHIVE_BUCKET_NAME = os.environ['QUOTES_ARCHIVE_BUCKET_NAME']
PROJECT_ID = os.environ['PROJECT_ID']
BQ_DATASET_NAME = os.environ['BQ_DATASET_NAME']
BQ_TABLE_NAME = os.environ['BQ_TABLE_NAME']
BQ_ID = '%s.%s.%s' % (PROJECT_ID, BQ_DATASET_NAME, BQ_TABLE_NAME)

# Local path to copy quotes CSV to
QUOTES_FILEPATH = os.getenv('QUOTES_FILEPATH', '/tmp/quotes.csv')
INSERT_BATCH_COUNT = int(os.getenv('INSERT_BATCH_COUNT'), 50000)

logging_client = google.cloud.logging.Client()
logging_client.setup_logging()

def download_quotes(bucket_name, source_blob_name, destination_file_name):
    """Downloads a blob from the bucket."""
    # The ID of your GCS bucket
    # bucket_name = "your-bucket-name"

    # The ID of your GCS object
    # source_blob_name = "storage-object-name"

    # The path to which the file should be downloaded
    # destination_file_name = "local/path/to/file"

    storage_client = storage.Client()

    bucket = storage_client.bucket(bucket_name)

    # Construct a client side representation of a blob.
    # Note `Bucket.blob` differs from `Bucket.get_blob` as it doesn't retrieve
    # any content from Google Cloud Storage. As we don't need additional data,
    # using `Bucket.blob` is preferred here.
    blob = bucket.blob(source_blob_name)
    blob.download_to_filename(destination_file_name)

    logging.info(
        "Downloaded storage object {} from bucket {} to local file {}.".format(
            source_blob_name, bucket_name, destination_file_name
        )
    )

def extract_strain(product_name):
    pass 

def transform_quote(quote_row):
    product_name = quote_row[8]
    strain = extract_strain(product_name)
    
    return {
        'city': quote_row[0],
        'grams_raw': quote_row[1],
        'marketplace_name': quote_row[2],
        'merchant_img_url': quote_row[3],
        'merchant_name': quote_row[4],
        'price_per_ounce': quote_row[5],
        'price_raw': quote_row[6],
        'product_img_url': quote_row[7],
        'product_name': product_name,
        'scrape_date': quote_row[9],
        'state': quote_row[10],
        'tags': quote_row[11],
        'url': quote_row[12],
        'strain': extract_strain(quote_row[8])
    }

def write_quotes_to_bq(quotes_to_insert):
    pass

def process_quotes_csv(reader, bq_id):
    quotes_to_insert = []
    for quote_row in reader:
        quotes_to_insert.append(transform_quote(quote_row))

        if len(quotes_to_insert) >= INSERT_BATCH_COUNT:
            write_quotes_to_bq(quotes_to_insert)
            quotes_to_insert = []

def process_quotes(quotes_filepath, bq_id):
    with open(quotes_filepath) as f:
        reader = csv.reader(f)
        next(reader, None)
        process_quotes_csv(reader, bq_id)

def add_strain_to_quotes(event, context):
    file_name = event.get('name')
    logging.info("%s: Starting import job" % file_name)
    download_quotes(QUOTES_BUCKET_NAME, file_name, QUOTES_FILEPATH)

    process_quotes(QUOTES_FILEPATH, BQ_ID)
    # iterate through rows and append strain to new CSV
    # save new CSV to bigquery
    # archive original CSV

def archive_file(file_name):
    storage_client = storage.Client()
    source_bucket = storage_client.get_bucket(QUOTES_BUCKET_NAME)
    source_blob = source_bucket.get_blob(file_name)
    destination_bucket = storage_client.get_bucket(QUOTES_ARCHIVE_BUCKET_NAME)

    # copy to new destination
    new_blob = source_bucket.copy_blob(
        source_blob, destination_bucket, file_name)
    # delete in old destination
    source_blob.delete()
    logging.info("%s: Finished moving from %s to %s." % (file_name, QUOTES_BUCKET_NAME, QUOTES_ARCHIVE_BUCKET_NAME))

def load_csv_from_gcs_to_bq(event, context):
    file_name = event.get('name')
    logging.info("%s: Starting import job" % file_name)

    # Construct the GCS file uri to load
    uri = f"gs://{QUOTES_BUCKET_NAME}/{file_name}"

    # Construct a BigQuery client object.
    client = bigquery.Client()

    bq_id = '%s.%s.%s' % (PROJECT_ID, BQ_DATASET_NAME, BQ_TABLE_NAME)

    job_config = bigquery.LoadJobConfig(
        autodetect=True,
        skip_leading_rows=1,
        source_format=bigquery.SourceFormat.CSV,
    )

    logging.info("%s: Loading table from URI..." % file_name)
    load_job = client.load_table_from_uri(
        uri, bq_id, job_config=job_config
    )  # Make an API request.

    load_job.result()  # Waits for the job to complete.
    logging.info("%s: Finished loading data from URI." % file_name)

    archive_file(file_name)

    destination_table = client.get_table(bq_id)  # Make an API request.
    logging.info("%s: Loaded %s rows." % (file_name, destination_table.num_rows))
