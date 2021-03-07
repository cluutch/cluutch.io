require 'rails_helper'

RSpec.describe "V2::Dailies", type: :request do

  describe "GET /index" do
    it "returns http success" do
      get "/v2/daily"
      expect(response).to have_http_status(:success)
    end

    it "returns http success" do
      # given three quotes created on different days
      create(:v2_quote, date: Date.today, price_per_ounce: 2)
      create(:v2_quote, date: Date.today, price_per_ounce: 4)
      create(:v2_quote, date: Date.yesterday, price_per_ounce: 5)

      # when daily prices are queried 
      get "/v2/daily"

      # expect two different 
      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json.length).to eq(2)
      expect(json[0]["date"]).to eq("2021-03-07")
      expect(json[0]["avg_price_per_ounce"]).to eq("3.0")
      expect(json[0]["jurisdiction"]).to eq("All U.S.")

      expect(json[1]["date"]).to eq("2021-03-06")
      expect(json[1]["avg_price_per_ounce"]).to eq("5.0")
      expect(json[1]["jurisdiction"]).to eq("All U.S.")
    end
  end
end
