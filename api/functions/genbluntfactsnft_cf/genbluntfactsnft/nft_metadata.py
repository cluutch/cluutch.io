
class NftMetadata:

    CREATOR_ADDRESS = "8d8HjmrFJVtrtM8dQ7at6WxKPfxgMJirBs9q3YYk9PBt"
    DEFAULT_FAMILY = 'Blunt Facts'
    DEFAULT_SYMBOL = 'BLF'
    DEFAULT_SELLER_FEE_BASIS_POINTS = 700

    def __init__(self, strain_info: dict, nft_number: int, img_uri: str,
                 family: str = DEFAULT_FAMILY,
                 seller_fee_basis_points: int = DEFAULT_SELLER_FEE_BASIS_POINTS) -> None:

        self.strain_info = strain_info
        self.strain = strain_info['strain']
        self.family = family
        self.nft_number = nft_number
        self.img_uri = img_uri
        self.seller_fee_basis_points = seller_fee_basis_points
        self.strain_category = self.strain_info['strain_type']['best']
        self.strain_aroma = self.strain_info['strain_aroma']['best']
        self.strain_feeling = self.strain_info['strain_feeling']['best']
        self.strain_bonus = self.strain_info['strain_other_attributes']['best']
        self.rarity = self.strain_info['num_listings']

    def gen_name(self):
        return self.strain.title() + ' | ' + self.family + " #" + str(self.nft_number)

    def gen_symbol(self):
        return  self.DEFAULT_SYMBOL + str(self.nft_number)

    def gen_description(self):
        return f"The information on this NFT has been generated based on thousands of weed " \
               f"dispensary listings, crawled daily. {self.strain.title()} is a " \
               f"{self.strain_category.lower()} strain with a {self.strain_aroma.lower()} aroma, " \
               f"it will make you feel {self.strain_feeling.lower()} and the lagniappe is " \
               f"{self.strain_bonus.lower()}. Rarity: {self.rarity}. By: cluutch.io"

    def gen_collection(self):
        return {
            "name": self.strain.title(),
            "family": self.family
        }

    def gen_attributes(self):
        return [
            {
                "trait_type": "strain",
                "value": self.strain_info['strain']
            },
            {
                "trait_type": "strain_category",
                "value": self.strain_category
            },
            {
                "trait_type": "rarity",
                "value": self.rarity
            },
            {
                "trait_type": "price_per_ounce_usd",
                "value": self.strain_info['avg_price_per_ounce']
            },
            {
                "trait_type": "aroma",
                "value": self.strain_aroma
            },
            {
                "trait_type": "feeling",
                "value": self.strain_feeling
            },
            {
                "trait_type": "bonus",
                "value": self.strain_bonus
            },
        ]

    # https://medium.com/cypher-game/how-to-create-a-solana-nft-with-python-68f6f775f742
    def gen_metadata(self) -> dict:
        return {
            "name": self.gen_name(),
            "symbol": self.gen_symbol(),
            "description": self.gen_description(),
            "seller_fee_basis_points": self.seller_fee_basis_points, 
            "image": self.img_uri, 
            "attributes": self.gen_attributes(),
            "collection": self.gen_collection(),
            "properties": {
                "files": [ 
                    {
                        "uri": self.img_uri,
                        "type": "image/png"
                    }
                ],
                "category": "image",
                "creators": [
                    {
                        "address": self.CREATOR_ADDRESS,
                        "share": 100
                   }
                ]
            }
        }