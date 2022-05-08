import logging
import io
from google.cloud import storage
from PIL import Image, ImageDraw, ImageFont
import json

from .nft_metadata import NftMetadata


def remove_background(img: Image, white_threshold: int) -> Image:
    new_img = img.copy()
    img_data = new_img.getdata()
    new_data = []
    for pixel in img_data:
        is_pixel_white = all(rgb > white_threshold for rgb in pixel)
        if is_pixel_white:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(pixel)

    new_img.putdata(new_data)
    return new_img


def transform_img(img: Image, point_multiplier: float) -> Image:
    new_img = img.copy()
    new_img = new_img.point(lambda i: i * point_multiplier)
    return new_img


def add_text(img: Image, text: str, xpos: int, ypos: int,
             font: ImageFont, color=(0, 0, 0)):
    new_img = img.copy()
    image_draw = ImageDraw.Draw(new_img)
    image_draw.text(
            (xpos, ypos), text, color, font=font)
    return new_img


def add_background(img: Image, color=(255, 255, 255)):
    # Create a white rgba background
    new_img = Image.new("RGBA", img.size, color)
    # Paste the image on the background
    new_img.paste(img, (0, 0), img)
    return new_img


class BluntFactsNft:
    INFO_FIELDS = ['strain_type', 'strain_aroma',
                   'strain_feeling', 'strain_other_attributes']
    BACKGROUND_COLOR = (146, 2, 88)
    TEXT_COLOR = (229, 229, 229)
    OUTPUT_IMG_FILETYPE = "PNG"
    DEFAULT_WHITE_THRESHOLD = 90
    DEFAULT_POINT_MULTIPLIER = 1.9

    NUMBER_WIDTH_PCT = 0.03
    TITLE_WIDTH_PCT = 0.50
    TITLE_HEIGHT_PCT = 0.03

    INFO_HEIGHT_PCT = 0.70

    DEFAULT_FONT_PATH = "genbluntfactsnft/StickNoBills-Bold.ttf"
    DEFAULT_TITLE_FONT_SIZE = 60

    DEFAULT_PRICE_FONT_PATH = "genbluntfactsnft/Sunflower-Medium.ttf"
    DEFAULT_PRICE_FONT_SIZE = 45

    DEFAULT_INFO_FONT_PATH = "genbluntfactsnft/Sunflower-Light.ttf"
    DEFAULT_INFO_FONT_SIZE = 45

    LINE_SPACING = 7

    def __init__(self,
                 strain_info: dict,
                 input_img_filename: str,
                 nft_number: int,
                 white_threshold: int = DEFAULT_WHITE_THRESHOLD,
                 point_multiplier: float = DEFAULT_POINT_MULTIPLIER,
                 title_font_path: str = DEFAULT_FONT_PATH,
                 title_font_size: int = DEFAULT_TITLE_FONT_SIZE,
                 info_font_size: int = DEFAULT_INFO_FONT_SIZE,
                 price_font_size: int = DEFAULT_PRICE_FONT_SIZE,
                 nft_number_width_pct: float = NUMBER_WIDTH_PCT,
                 title_width_pct: float = TITLE_WIDTH_PCT,
                 write_to_cloud: bool = False,
                 output_cloud_bucket: str = None,
                 input_cloud_bucket: str = None,
                 use_cloud: bool = False
                 ):

        self.strain_info = strain_info
        self.input_img_filename = input_img_filename
        self.output_cloud_bucket = output_cloud_bucket
        self.input_cloud_bucket = input_cloud_bucket
        self.nft_number = nft_number

        self.white_threshold = white_threshold
        self.point_multiplier = point_multiplier

        self.title_font_size = title_font_size
        self.title_font = ImageFont.truetype(title_font_path,
                                             size=self.title_font_size)
        self.price_font_size = price_font_size

        self.price_font = ImageFont.truetype(self.DEFAULT_PRICE_FONT_PATH,
                                             self.price_font_size)

        self.info_font_size = info_font_size
        self.info_font = ImageFont.truetype(self.DEFAULT_INFO_FONT_PATH,
                                            size=self.info_font_size)

        self.nft_number_width_pct = nft_number_width_pct
        self.title_width_pct = title_width_pct
        self.write_to_cloud = write_to_cloud
        self.use_cloud = use_cloud

    def add_title_to_img(self, xpos, ypos) -> int:
        title = self.strain_info['strain'].title()
        self.img = add_text(self.img, title, xpos, ypos, self.title_font,
                            color=self.TEXT_COLOR)
        return ypos + self.LINE_SPACING + self.title_font_size + 13

    def add_price_to_img(self, xpos, ypos) -> int:
        avg_price_per_ounce = self.strain_info['avg_price_per_ounce']
        
        if avg_price_per_ounce is not None:
            price = '$' + str(round(avg_price_per_ounce, 2)) + " / oz."
        else:
            price ="$UNKNOWN$"        
        
        self.img = add_text(self.img, price, xpos, ypos, self.price_font,
                            color=self.TEXT_COLOR)
        return ypos + self.LINE_SPACING + self.price_font_size

    def add_info_to_img(self, xpos, ypos) -> int:
        for info_type in self.INFO_FIELDS:
            text = self.strain_info[info_type]['best']
            self.img = add_text(self.img, text, xpos, ypos, self.info_font,
                                color=self.TEXT_COLOR)
            ypos += self.info_font_size + self.LINE_SPACING

        return ypos

    def load_img_as_rgb(self):
        if self.use_cloud:
            storage_client = storage.Client()
            bucket = storage_client.get_bucket(self.input_cloud_bucket)
            blob = bucket.get_blob(self.input_img_filename).download_as_string()
            bytes = io.BytesIO(blob)
            self.img = Image.open(bytes)
        else:
            self.img = Image.open(self.input_img_filename)

        self.img.convert('RGBA')

    def gen_img(self, yoffset=0):
        logging.info("Loading original img")
        self.load_img_as_rgb()

        logging.info("Removing background")
        self.img = remove_background(self.img, self.white_threshold)

        logging.info("Transforming img")
        self.img = transform_img(self.img, self.point_multiplier)

        logging.info("Adding text to image")
        xpos = self.img.width * self.nft_number_width_pct
        ypos = self.img.height * self.TITLE_HEIGHT_PCT + yoffset
        number_text = f"#{self.nft_number}"
        self.img = add_text(self.img, number_text, xpos, ypos, self.title_font,
                            color=self.TEXT_COLOR)

        xpos = self.img.width * self.title_width_pct
        ypos = self.add_title_to_img(xpos, ypos)

        self.add_price_to_img(xpos, ypos)

        ypos = self.img.height * self.INFO_HEIGHT_PCT
        self.add_info_to_img(xpos, ypos)

        logging.info("Adding background")
        self.img = add_background(self.img, color=self.BACKGROUND_COLOR)

        logging.info("Preparing to save output")
        return self.save_output()

    def save_output(self):
        dashed_strain = f"{self.strain_info['strain'].lower().replace(' ', '-')}"
        fileid = f"{dashed_strain}-blunt-facts-{self.nft_number}"
        img_filename = f"{fileid}.png"
        metadata_filename = f"{fileid}.json"
        img_host = "https://storage.googleapis.com"
        img_uri = f"{img_host}/{self.output_cloud_bucket}/{img_filename}"
        metadata = NftMetadata(self.strain_info, self.nft_number, img_uri)

        if self.use_cloud:
            logging.info(f"Saving img to cloud {self.output_cloud_bucket}/{img_filename}")
            storage_client = storage.Client()
            upload_bucket = storage_client.get_bucket(self.output_cloud_bucket)
            upload_blob = upload_bucket.blob(img_filename)
            img_byte_array = io.BytesIO()
            self.img.save(img_byte_array, self.OUTPUT_IMG_FILETYPE)
            upload_blob.upload_from_string(img_byte_array.getvalue(), content_type="image/png")

            # Upload metadata
            logging.info(f"Saving metadata to cloud {self.output_cloud_bucket}/{img_filename}")
            metadata_str = json.dumps(metadata.gen_metadata(), indent=4)
            metadata_blob = upload_bucket.blob(metadata_filename)
            metadata_blob.upload_from_string(metadata_str, content_type="application/json")
        else:
            logging.info(f"Saving to file {img_filename}")
            self.img.save(img_filename, self.OUTPUT_IMG_FILETYPE)
            metadata_file = open(metadata_filename, "w")
            json.dump(metadata.gen_metadata(), metadata_file, indent=4)
            metadata_file.close()

        return img_filename, metadata_filename
