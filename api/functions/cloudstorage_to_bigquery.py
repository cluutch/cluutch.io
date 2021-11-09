# From: https://stackoverflow.com/questions/68752082/how-large-a-file-size-from-gcs-can-handle-in-cloud-function

# google-cloud-bigquery==2.28.1
# google-cloud-storage==1.42.2
# google-cloud-logging==2.7.0

import logging
import os
from google.cloud import bigquery, storage
import google.cloud.logging

QUOTES_BUCKET_NAME = os.environ['QUOTES_BUCKET_NAME']
QUOTES_ARCHIVE_BUCKET_NAME = os.environ['QUOTES_ARCHIVE_BUCKET_NAME']
PROJECT_ID = os.environ['PROJECT_ID']
BQ_DATASET_NAME = os.environ['BQ_DATASET_NAME']
BQ_TABLE_NAME = os.environ['BQ_TABLE_NAME']

logging_client = google.cloud.logging.Client()
logging_client.setup_logging()

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
