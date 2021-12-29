import os
import logging
import google.cloud.logging

from google.cloud import bigquery
from flask import Flask

from gen_strain_info import gen_info_for_all_strains

LOGGING_CLIENT = google.cloud.logging.Client()
LOGGING_CLIENT.setup_logging()


def write_strain_info_to_bq(all_strain_info):
  pass


##########
# Flask app

app = Flask(__name__)

@app.route("/")
def get_all_strains_endpoint():
    logging.info("Flask endpoint hit")
    all_strain_info = gen_info_for_all_strains()
    write_strain_info_to_bq(all_strain_info)
    return True

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))