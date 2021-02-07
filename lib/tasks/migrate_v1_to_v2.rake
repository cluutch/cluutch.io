desc "Migrate v1 quotes to v2"

def create_v2_quote_from_v1(base_params, jurisdiction, market_price_per_oz)
  quote = V2::Quote.new base_params
  quote.v2_jurisdiction_id = jurisdiction.id
  quote.price_per_ounce = market_price_per_oz
  quote.save
end

task migrate_v1_to_v2: :environment do
  california = V2::Jurisdiction.find_or_create_by(name: "California")
  colorado = V2::Jurisdiction.find_or_create_by(name: "Colorado")
  darkweb = V2::Jurisdiction.find_or_create_by(name: "Darkweb")
  florida = V2::Jurisdiction.find_or_create_by(name: "Florida")
  nevada = V2::Jurisdiction.find_or_create_by(name: "Nevada")
  dc = V2::Jurisdiction.find_or_create_by(name: "Washington, D.C.")

  Quote.all.each do |q|
    base_params = {
      date: q.date,
      vendor_name: "Unknown", vendor_url: "Unknown", vendor_branch: "Unknown",
      is_primary: true
    }

    # Copy the four v1 market prices into separate v2 quotes
    create_v2_quote_from_v1(base_params, nevada, q.market1_price_per_oz)
    create_v2_quote_from_v1(base_params, colorado, q.market2_price_per_oz)
    create_v2_quote_from_v1(base_params, california, q.market3_price_per_oz)
    create_v2_quote_from_v1(base_params, darkweb, q.market4_price_per_oz)
  end
end

