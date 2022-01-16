import argparse
import json
import requests
from known_tags import STRAIN_TYPES, STRAIN_AROMAS, STRAIN_FEELINGS, IGNORE_TAGS

STRAIN_TYPE = 'strain_type'
STRAIN_AROMA = 'strain_aroma'
STRAIN_FEELING = 'strain_feeling'
STRAIN_OTHER_ATTRIBUTES = 'strain_other_attributes'
STRAIN_INFO_CLASSIFICATIONS = [
    {'category': STRAIN_TYPE, 'options': STRAIN_TYPES},
    {'category': STRAIN_AROMA, 'options': STRAIN_AROMAS},
    {'category': STRAIN_FEELING, 'options': STRAIN_FEELINGS}
  ]

def classify_strain_json(strain_json, options):
  # sum all
  pass


def get_total_for_options(options, strain_json):
  # count total
  def count_for_option(option):
    return int(strain_json["is_" + option])
  
  option_counts = list(map(count_for_option, options))
  return sum(option_counts)


def mutate_strain_json_to_percentages(strain_json, category, options, total):
  strain_json[category] = { }
  for option in options:
    pct = int(strain_json['is_' + option]) / total
    pct = round(pct * 100, 2)
    del strain_json['is_' + option]
    strain_json[category][option] = pct

  best_match = max(strain_json[category], key=strain_json[category].get)
  best_pct = str(round(strain_json[category][best_match]))
  strain_json[category]['best'] = best_match.title() + ": " + best_pct +  "%"


def strip_whitespace(tag):
  return tag.strip()


def get_sanitized_tags(strain_json):
    def filter_irrelevant_tags(tag):
        irrelevant_tags = STRAIN_TYPES + \
                          STRAIN_AROMAS + \
                          STRAIN_FEELINGS + \
                          IGNORE_TAGS

        return tag not in irrelevant_tags and \
            strain_json['strain'] not in tag

    tags = strain_json['tags']
    tags = tags.lower()
    tags = tags.split(';')
    tags = map(strip_whitespace, tags)
    tags = list(filter(filter_irrelevant_tags, tags))
    return tags


def update_strain_other_attributes(strain_json, tags):
    for tag in tags:
        if tag not in strain_json[STRAIN_OTHER_ATTRIBUTES]:
          strain_json[STRAIN_OTHER_ATTRIBUTES][tag] = 1
        else:
          strain_json[STRAIN_OTHER_ATTRIBUTES][tag] += 1


def mutate_tags_to_percentages(strain_json, total):
  for tag in strain_json[STRAIN_OTHER_ATTRIBUTES].keys():
    pct = int(strain_json[STRAIN_OTHER_ATTRIBUTES][tag]) / total
    pct = round(pct * 100, 2)
    strain_json[STRAIN_OTHER_ATTRIBUTES][tag] = pct

  best_match = max(strain_json[STRAIN_OTHER_ATTRIBUTES], key=strain_json[STRAIN_OTHER_ATTRIBUTES].get)
  best_pct = str(round(strain_json[STRAIN_OTHER_ATTRIBUTES][best_match]))
  strain_json[STRAIN_OTHER_ATTRIBUTES]['best'] = best_match.title() + ": " + best_pct +  "%"


def process_other_tags(strain_json):
  strain_json[STRAIN_OTHER_ATTRIBUTES] = {}
  tags = get_sanitized_tags(strain_json)
  update_strain_other_attributes(strain_json, tags)
  del strain_json['tags']
  total_listings_for_option = len(tags)
  mutate_tags_to_percentages(strain_json, total_listings_for_option)


def process_strain_json(strain_json):
  strain_info = { }
  for classification in STRAIN_INFO_CLASSIFICATIONS:
    category = classification['category']
    options = classification['options']  

    total_listings_for_option = get_total_for_options(options, strain_json)
    mutate_strain_json_to_percentages(strain_json, category, options, total_listings_for_option)


  process_other_tags(strain_json)
  print(json.dumps(strain_json, indent=4))


def get_strain_json(strain: str):
    params = {'strain': strain}
    return requests.get('https://api.cluutch.io/v3/strain', params=params).json()