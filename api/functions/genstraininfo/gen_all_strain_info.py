import csv
import json

"""
Tags are stored as a semicolon separated string in BigQuery.
In order to generate strain information, we group tags into
different classifications (eg aromas, feelings, indica/sativa).
The frequency of the tags is then computed and turned into
a percentage. Percentages within a classification add up to 100%.

The most popular tag per classification is recorded as 'best'
for easy lookup.

✗ python gen_strain_info.py

{
    "strain_type": {
        "hybrid": 80.22,
        "indica": 19.78,
        "best": "hybrid"
    },
    "strain_aroma": {
        "berry": 28.77,
        "blueberry": 28.63,
        "grape": 28.63,
        "earthy": 2.84,
        "flowery": 3.48,
        "papaya": 2.84,
        "sweet": 3.16,
        "citrus": 0.67,
        "skunk": 0.49,
        "tropical": 0.49,
        "best": "berry"
    },
    "strain_feeling": {
        "euphoric": 19.05,
        "happy": 32.89,
        "relaxed": 33.04,
        "uplifted": 3.82,
        "giggly": 11.21,
        "best": "relaxed"
    },
    "strain_other_attributes": {
        "recreational": 100.0,
        "best": "recreational"
    }
}
"""

CSV_TITLE = 'moonbow_tags.csv'

STRAIN_TYPE = 'strain_type'
STRAIN_TYPE_INDICA = 'indica'
STRAIN_TYPE_HYBRID = 'hybrid'
STRAIN_TYPE_SATIVA = 'sativa'
STRAIN_TYPES = [STRAIN_TYPE_INDICA, STRAIN_TYPE_HYBRID, STRAIN_TYPE_SATIVA]

STRAIN_AROMA = 'strain_aroma'
STRAIN_AROMA_BERRY = 'berry'
STRAIN_AROMA_BLUEBERRY = 'blueberry'
STRAIN_AROMA_GRAPE = 'grape'
STRAIN_AROMA_EARTHY = 'earthy'
STRAIN_AROMA_FLOWERY = 'flowery'
STRAIN_AROMA_PAPAYA = 'papaya'
STRAIN_AROMA_SWEET = 'sweet'
STRAIN_AROMA_CITRUS = 'citrus'
STRAIN_AROMA_SKUNK = 'skunk'
STRAIN_AROMA_TROPICAL = 'tropical'

STRAIN_AROMAS = [STRAIN_AROMA_BERRY, STRAIN_AROMA_BLUEBERRY, STRAIN_AROMA_GRAPE, STRAIN_AROMA_GRAPE,
                 STRAIN_AROMA_EARTHY, STRAIN_AROMA_FLOWERY, STRAIN_AROMA_PAPAYA, STRAIN_AROMA_SWEET,
                 STRAIN_AROMA_CITRUS, STRAIN_AROMA_SKUNK, STRAIN_AROMA_TROPICAL]

STRAIN_FEELING = 'strain_feeling'
STRAIN_FEELING_EUPHORIC = 'euphoric'
STRAIN_FEELING_HAPPY = 'happy'
STRAIN_FEELING_RELAXED = 'relaxed'
STRAIN_FEELING_UPLIFTED = 'uplifted'
STRAIN_FEELING_GIGGLY = 'giggly'
STRAIN_FEELINGS = [STRAIN_FEELING_EUPHORIC, STRAIN_FEELING_HAPPY, STRAIN_FEELING_RELAXED,
                    STRAIN_FEELING_UPLIFTED, STRAIN_FEELING_GIGGLY]

STRAIN_OTHER_ATTRIBUTES = 'strain_other_attributes'

STRAIN_INFO_CLASSIFICATIONS = [
                          {'category': STRAIN_TYPE, 'options': STRAIN_TYPES},
                          {'category': STRAIN_AROMA, 'options': STRAIN_AROMAS},
                          {'category': STRAIN_FEELING, 'options': STRAIN_FEELINGS}
                        ]

def strip_whitespace(tag):
  return tag.strip()

def get_sanitized_tags(csvrow, strain):
  def filter_irrelevant_tags(tag):
    irrelevant_tags = ['flower', '', 'tags']
    return tag not in irrelevant_tags and \
            strain not in tag

  tags = csvrow[1]
  tags = tags.lower()
  tags = tags.split(';')
  tags = map(strip_whitespace, tags)
  tags = list(filter(filter_irrelevant_tags, tags))
  return tags

def update_strain_info_and_tags(strain_info, strain_info_category, strain_info_category_options, tags):
  for strain_info_category_option in strain_info_category_options:
    if strain_info_category_option in tags:
      if strain_info_category_option not in strain_info[strain_info_category]:
        strain_info[strain_info_category][strain_info_category_option] = 1
      else:
        strain_info[strain_info_category][strain_info_category_option] += 1

      tags.remove(strain_info_category_option)

def update_strain_other_attributes(strain_info, tags):
  for tag in tags:
    if tag not in strain_info[STRAIN_OTHER_ATTRIBUTES]:
      strain_info[STRAIN_OTHER_ATTRIBUTES][tag] = 1
    else:
      strain_info[STRAIN_OTHER_ATTRIBUTES][tag] += 1

def update_strain_info(strain_info, csvrow):
  strain = csvrow[3]
  tags = get_sanitized_tags(csvrow, strain)
  for classification in STRAIN_INFO_CLASSIFICATIONS:
    update_strain_info_and_tags(strain_info, classification['category'], classification['options'], tags)

  update_strain_other_attributes(strain_info, tags)

def gen_empty_strain_info():
    strain_info = { }
    for classification in STRAIN_INFO_CLASSIFICATIONS:
      strain_info[classification['category']] = { }
    
    strain_info[STRAIN_OTHER_ATTRIBUTES] = { }

    return strain_info

def summarize_strain_info(strain_info):
    """
    Convert to percentages and find the best match.
    """
    all_classifications = [{'category': STRAIN_OTHER_ATTRIBUTES}]
    all_classifications = all_classifications + STRAIN_INFO_CLASSIFICATIONS

    for classification in all_classifications:
      category = classification['category']
      total = sum(strain_info[category].values())

      for option in strain_info[category]:
        option_val = strain_info[category][option]
        option_val = option_val / total
        option_val = round(option_val * 100, 2)
        strain_info[category][option] = option_val

      best_match = max(strain_info[category], key=strain_info[category].get)
      strain_info[category]['best'] = best_match

def get_strain_info():
  with open(CSV_TITLE) as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')

    strain_info = gen_empty_strain_info()
    for csvrow in csvreader:
      update_strain_info(strain_info, csvrow)

    summarize_strain_info(strain_info)
    logging.info(json.dumps(strain_info, indent=4))
    return strain_info

def gen_info_for_all_strains():
  return []

# strain_info = get_strain_info()

# get all strains with quotes
# loop through each and get all quotes for strain
# get strain info for each