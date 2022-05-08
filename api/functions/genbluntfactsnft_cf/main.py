from flask import escape
import functions_framework
from genbluntfactsnft.blunt_facts_nft import BluntFactsNft
import requests
import logging
import google.cloud.logging

logging_client = google.cloud.logging.Client()
logging_client.setup_logging()

BLUNT_FACTS_ENDPOINTS = "https://api.cluutch.io/v3/blunt-facts"
INPUT_CLOUD_BUCKET = 'blunt-facts-input'
OUTPUT_CLOUD_BUCKET = 'blunt-facts-nfts'

"""
curl -X POST \
     -H 'Content-Type: application/json' \
     -d '{"strain":"fig farm","nft_number":"4","input_img_filename":"figfarm-input.png"}' \
    https://us-central1-cluutch.cloudfunctions.net/gen-blunt-facts-nft
"""

@functions_framework.http
def gen_blunt_facts_nft(request):
    """HTTP Cloud Function.
    Args:
        request (flask.Request): The request object.
        <https://flask.palletsprojects.com/en/1.1.x/api/#incoming-request-data>
    Returns:
        The response text, or any set of values that can be turned into a
        Response object using `make_response`
        <https://flask.palletsprojects.com/en/1.1.x/api/#flask.make_response>.
    """
    request_json = request.get_json(silent=True)
    request_args = request.args

    # Parse params
    if request_json and 'strain' in request_json:
        strain = request_json['strain']
    elif request_args and 'strain' in request_args:
        strain = request_args['strain']
    else:
        return 'Invalid strain'
    strain = escape(strain)
    logging.debug(f"Creating {strain.title()} Blunt Facts NFT")

    if request_json and 'nft_number' in request_json:
        nft_number = request_json['nft_number']
    elif request_args and 'nft_number' in request_args:
        nft_number = request_args['nft_number']
    else:
        return 'Invalid nft_number'

    if request_json and 'input_img_filename' in request_json:
        input_img_filename = request_json['input_img_filename']
    elif request_args and 'input_img_filename' in request_args:
        input_img_filename = request_args['input_img_filename']
    else:
        return 'Invalid input_img_filename'

    if request_json and 'title_width_pct' in request_json:
        title_width_pct = request_json['title_width_pct']
    elif request_args and 'title_width_pct' in request_args:
        title_width_pct = request_args['title_width_pct']
    else:
        title_width_pct = 0.55
    
    if request_json and 'title_font_size' in request_json:
        title_font_size = request_json['title_font_size']
    elif request_args and 'title_font_size' in request_args:
        title_font_size = request_args['title_font_size']
    else:
        title_font_size = 40
    
    if request_json and 'price_font_size' in request_json:
        price_font_size = request_json['price_font_size']
    elif request_args and 'price_font_size' in request_args:
        price_font_size = request_args['price_font_size']
    else:
        price_font_size = 30
    
    if request_json and 'info_font_size' in request_json:
        info_font_size = request_json['info_font_size']
    elif request_args and 'info_font_size' in request_args:
        info_font_size = request_args['info_font_size']
    else:
        info_font_size = 30

    if request_json and 'nft_number_width_pct' in request_json:
        nft_number_width_pct = request_json['nft_number_width_pct']
    elif request_args and 'nft_number_width_pct' in request_args:
        nft_number_width_pct = request_args['nft_number_width_pct']
    else:
        nft_number_width_pct = 0.03

    logging.debug("Requesting blunt facts info")
    blunt_facts_info = requests.get(BLUNT_FACTS_ENDPOINTS,
                                    params={'strain': strain}).json()


    logging.debug("Generating NFT image")
    nft = BluntFactsNft(blunt_facts_info,
                        input_img_filename,
                        nft_number,
                        title_width_pct=title_width_pct,
                        title_font_size=title_font_size,
                        price_font_size=price_font_size,
                        info_font_size=info_font_size,
                        nft_number_width_pct=nft_number_width_pct,
                        use_cloud=True,
                        output_cloud_bucket=OUTPUT_CLOUD_BUCKET,
                        input_cloud_bucket=INPUT_CLOUD_BUCKET)

    nft_filename = nft.gen_img()
    nft_location = f"gs://{OUTPUT_CLOUD_BUCKET}/{nft_filename}"
    return {'nft_location': nft_location}
