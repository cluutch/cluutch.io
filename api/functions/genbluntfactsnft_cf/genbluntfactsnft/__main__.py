import logging
import requests
from genbluntfactsnft.blunt_facts_nft import BluntFactsNft

BLUNT_FACTS_ENDPOINTS = "https://api.cluutch.io/v3/blunt-facts"
logging.root.setLevel(logging.DEBUG)

def main():
    params = {
        'strain': 'fig farm',
        'input_img': 'figfarm-input.png',
        'nft_number': 4
    }
    strain = params['strain'].title()
    print(f"Creating {strain} NFT")

    nft_number = params['nft_number']
    input_img_filepath = params['input_img']
    
    blunt_facts_info = requests.get(BLUNT_FACTS_ENDPOINTS, params=params).json()

    print(blunt_facts_info)
    fig_farm_nft = BluntFactsNft(blunt_facts_info,
                                 input_img_filepath,
                                 nft_number,
                                 title_font_size=30,
                                 price_font_size=24,
                                 info_font_size=24,
                                 nft_number_width_pct=0.01,
                                 title_width_pct=0.55)
    fig_farm_nft.gen_img()


if __name__ == '__main__':
    main()
