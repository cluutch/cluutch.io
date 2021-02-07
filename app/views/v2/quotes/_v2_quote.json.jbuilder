json.extract! v2_quote, :id, :vendor_name, :vendor_url, :vendor_branch, :is_primary, :price_per_ounce, :v2_jurisdiction_id, :created_at, :updated_at
json.url v2_quote_url(v2_quote, format: :json)
