import os
import logging
import google.cloud.logging

from flask import Flask

from genstraininfo import get_strain_json, process_strain_json

LOGGING_CLIENT = google.cloud.logging.Client()
LOGGING_CLIENT.setup_logging()

##########
# Flask app

app = Flask(__name__)


@app.route("/")
def gen_strain_info():
    logging.info("Flask endpoint hit")
    strain_json = get_strain_json(args.strain)
    process_strain_json(strain_json)
    return True


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
