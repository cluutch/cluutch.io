import csv

"""
    SELECT  
        product_name,
        CASE 
            WHEN CONTAINS_SUBSTR(product_name, 'blue') then 'blue'
            ...
            ELSE null
        END
        AS strain,
        * EXCEPT(product_name), 
        CAST(DATE(scrape_date) AS DATE) as `date`
    FROM `cluutch.api_cluutch_io.quotes`
"""

OTREEBA_STRAINS_FILENAME = 'strains.csv'
CUSTOM_STRAINS_FILENAME = 'custom_strains.csv'
QUERY_FILENAME = 'query.sql'

BLOCKLIST = [
    'or',
    'es',
    'flower',
    'duct',
    'flow',
    'pod',
    'sin',
    'hybrid',
    'sativa',
    'flo'
]

PRIORITY_STRAINS = [
    'amnesia haze',
    'moonbow'
]

def write_otreeba_strain_to_query(query_file, strain_row):
    strain_name = strain_row[0].lower().replace("'", '\\\'')

    is_name_two_words = len(strain_name.split(" ")) <= 2
    is_name_short_enough = len(strain_name) <= 11
    is_name_long_enough = len(strain_name) > 2
    not_on_blocklist = strain_name not in BLOCKLIST
    is_name_acceptable = is_name_two_words and is_name_short_enough and not_on_blocklist and is_name_long_enough

    if is_name_acceptable:
        # query_file.write("\t\tWHEN CONTAINS_SUBSTR(product_name, '%s') then '%s'\n" % 
        query_file.write("WHEN CONTAINS_SUBSTR(product_name,'%s') then '%s'\n" % 
            (strain_name, strain_name))

def write_otreeba_strains_to_query(query_file, strains_filename):
    with open(strains_filename) as f:
        reader = csv.reader(f)
        next(reader, None)
        for row in reader:
            write_otreeba_strain_to_query(query_file, row)

def write_custom_strain_to_query(query_file, strain_row):
    strain_match = strain_row[0].lower().replace("'", '\\\'')
    strain_name = strain_row[1].lower().replace("'", '\\\'')
    # print(strain_name)
    # query_file.write("\t\tWHEN CONTAINS_SUBSTR(product_name, '%s') then '%s'\n" % 
    query_file.write("WHEN CONTAINS_SUBSTR(product_name,'%s') then '%s'\n" % 
        (strain_match, strain_name))

def write_custom_strains_to_query(query_file, custom_strains):
    with open(custom_strains) as f:
        reader = csv.reader(f)
        next(reader, None)
        for row in reader:
            write_custom_strain_to_query(query_file, row)

def write_priority_strains_to_query(query_file, priority_strains):
    for priority_strain in priority_strains:
        query_file.write("WHEN CONTAINS_SUBSTR(product_name,'%s') then '%s'\n" % 
            (priority_strain, priority_strain))

def write_start_to_query(query_file):
    lines = [
        "DROP MATERIALIZED VIEW `cluutch.api_cluutch_io.materialized_unordered_transformed_quotes`;\n"
        "CREATE MATERIALIZED VIEW `cluutch.api_cluutch_io.materialized_unordered_transformed_quotes` AS\n"
        "SELECT\n",
        "\tCONTAINS_SUBSTR(tags, 'Hybrid') as is_hybrid,\n",
        "\tCONTAINS_SUBSTR(tags, 'Sativa') as is_sativa,\n",
        "\tCONTAINS_SUBSTR(tags, 'Indica') as is_indica,\n",
        "\tCONTAINS_SUBSTR(tags, 'Berry') as is_berry,\n",
        "\tCONTAINS_SUBSTR(tags, 'Blueberry') as is_blueberry,\n",
        "\tCONTAINS_SUBSTR(tags, 'Grape') as is_grape,\n",
        "\tCONTAINS_SUBSTR(tags, 'Earthy') as is_earthy,\n",
        "\tCONTAINS_SUBSTR(tags, 'Flowery') as is_flowery,\n",
        "\tCONTAINS_SUBSTR(tags, 'Papaya') as is_papaya,\n",
        "\tCONTAINS_SUBSTR(tags, 'Sweet') as is_sweet,\n",
        "\tCONTAINS_SUBSTR(tags, 'Citrus') as is_citrus,\n",
        "\tCONTAINS_SUBSTR(tags, 'Skunk') as is_skunk,\n",
        "\tCONTAINS_SUBSTR(tags, 'Tropical') as is_tropical,\n",
        "\tCONTAINS_SUBSTR(tags, 'Euphoric') as is_euphoric,\n",
        "\tCONTAINS_SUBSTR(tags, 'Happy') as is_happy,\n",
        "\tCONTAINS_SUBSTR(tags, 'Relaxed') as is_relaxed,\n",
        "\tCONTAINS_SUBSTR(tags, 'Uplifted') as is_uplifted,\n",
        "\tCONTAINS_SUBSTR(tags, 'Giggly') as is_giggly,\n",
        "\tCONTAINS_SUBSTR(tags, 'Blackberry') as is_blackberry,\n",
        "\tCONTAINS_SUBSTR(tags, 'Cheese') as is_cheese,\n",
        "\tCONTAINS_SUBSTR(tags, 'Pine') as is_pine,\n",
        "\tCONTAINS_SUBSTR(tags, 'Creative') as is_creative,\n",
        "\tCONTAINS_SUBSTR(tags, 'Focused') as is_focused,\n",
        "\tCONTAINS_SUBSTR(tags, 'Nutty') as is_nutty,\n",
        "\tCONTAINS_SUBSTR(tags, 'Pungent') as is_pungent,\n",
        "\tCONTAINS_SUBSTR(tags, 'Energetic') as is_energetic,\n",
        "\tproduct_name,\n",
        "\tCASE\n"
    ]
    query_file.writelines(lines)

def write_end_to_query(query_file):
    lines = [
        "\t\tELSE null\n",
        "\tEND\n",
        "\tAS strain,\n",
        "\tLOWER(REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(REGEXP_REPLACE(tags, 'Flower;?', ''), 'Hybrid;?', ''), 'Sativa;?', ''), 'Indica;?', ''), strain, '') as tags,\n"
        "\t* EXCEPT(product_name, tags),\n",
        "\tCAST(DATE(scrape_date) AS DATE) as `date`\n",
        "FROM `cluutch.api_cluutch_io.quotes`"
    ]
    query_file.writelines(lines)

def generate_query():
    query_file = open(QUERY_FILENAME, "w")
    write_start_to_query(query_file)
    write_priority_strains_to_query(query_file, PRIORITY_STRAINS)
    write_otreeba_strains_to_query(query_file, OTREEBA_STRAINS_FILENAME)
    write_custom_strains_to_query(query_file, CUSTOM_STRAINS_FILENAME)
    write_end_to_query(query_file)
    query_file.close()

generate_query()
