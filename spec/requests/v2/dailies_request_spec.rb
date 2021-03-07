require 'rails_helper'

RSpec.describe "V2::Dailies", type: :request do

  describe "GET /index" do
    it "returns http success" do
      get "/v2/daily"
      expect(response).to have_http_status(:success)
    end

    it "returns all avg daily prices" do
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
      expect(json[0]["date"]).to eq(Date.today.to_s)
      expect(json[0]["avg_price_per_ounce"]).to eq("3.0")
      expect(json[0]["jurisdiction"]).to eq("All U.S.")

      expect(json[1]["date"]).to eq(Date.yesterday.to_s)
      expect(json[1]["avg_price_per_ounce"]).to eq("5.0")
      expect(json[1]["jurisdiction"]).to eq("All U.S.")
    end

    it "returns all avg daily prices by specific jurisdiction" do
      # given three quotes created on different days
      florida = create(:v2_jurisdiction, name: "Florida")
      create(:v2_quote, date: Date.today, price_per_ounce: 2)
      create(:v2_quote, date: Date.today, price_per_ounce: 2)
      create(:v2_quote, date: Date.today, price_per_ounce: 9, jurisdiction: florida)
      create(:v2_quote, date: Date.today, price_per_ounce: 11, jurisdiction: florida)
      create(:v2_quote, date: Date.yesterday, price_per_ounce: 6, jurisdiction: florida)
      create(:v2_quote, date: Date.yesterday, price_per_ounce: 5)
      create(:v2_quote, date: Date.yesterday - 1, price_per_ounce: 5)

      # when daily prices are queried 
      get "/v2/daily", params: { jurisdiction: "Florida" }

      # expect two different 
      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json.length).to eq(2)
      expect(json[0]["date"]).to eq(Date.today.to_s)
      expect(json[0]["avg_price_per_ounce"]).to eq("10.0")
      expect(json[0]["jurisdiction"]).to eq("Florida")

      expect(json[1]["date"]).to eq(Date.yesterday.to_s)
      expect(json[1]["avg_price_per_ounce"]).to eq("6.0")
      expect(json[1]["jurisdiction"]).to eq("Florida")
    end

    describe 'price for specific date' do
      it "returns the exact date if available" do
        # given three quotes created on different days
        create(:v2_quote, date: Date.today, price_per_ounce: 2)
        create(:v2_quote, date: Date.today, price_per_ounce: 4)
        create(:v2_quote, date: Date.yesterday, price_per_ounce: 5)
        create(:v2_quote, date: Date.yesterday, price_per_ounce: 7)
        create(:v2_quote, date: Date.yesterday - 6, price_per_ounce: 13)
  
        # when daily prices are queried 
        get "/v2/daily", params: { date: Date.yesterday.to_s }
  
        # expect two different 
        expect(response).to have_http_status(:success)
        json = JSON.parse(response.body)
        expect(json.length).to eq(1)
        expect(json[0]["date"]).to eq(Date.yesterday.to_s)
        expect(json[0]["avg_price_per_ounce"]).to eq("6.0")
        expect(json[0]["jurisdiction"]).to eq("All U.S.")
      end

      it "returns the most recent date without going past" do
        # given three quotes created on different days
        create(:v2_quote, date: Date.today, price_per_ounce: 2)
        create(:v2_quote, date: Date.today, price_per_ounce: 4)
        create(:v2_quote, date: Date.yesterday, price_per_ounce: 5)
        create(:v2_quote, date: Date.yesterday, price_per_ounce: 7)
        create(:v2_quote, date: Date.yesterday - 6, price_per_ounce: 13)
        create(:v2_quote, date: Date.yesterday - 6, price_per_ounce: 15)
        create(:v2_quote, date: Date.yesterday - 8, price_per_ounce: 13)
  
        # when daily prices are queried 
        get "/v2/daily", params: { date: (Date.yesterday - 5).to_s } # in between yesterday and 7 days ago
  
        # expect two different 
        expect(response).to have_http_status(:success)
        json = JSON.parse(response.body)
        expect(json.length).to eq(1)
        expect(json[0]["date"]).to eq((Date.yesterday - 6).to_s)
        expect(json[0]["avg_price_per_ounce"]).to eq("14.0")
        expect(json[0]["jurisdiction"]).to eq("All U.S.")
      end

      it "returns the most recent date without going past for a specific jurisdiction" do
        florida = create(:v2_jurisdiction, name: "Florida")

        create(:v2_quote, date: Date.today, price_per_ounce: 2)
        create(:v2_quote, date: Date.today, price_per_ounce: 4)
        create(:v2_quote, date: Date.yesterday, price_per_ounce: 5, jurisdiction: florida)
        create(:v2_quote, date: Date.yesterday, price_per_ounce: 7)
        create(:v2_quote, date: Date.yesterday - 6, price_per_ounce: 13)
        create(:v2_quote, date: Date.yesterday - 6, price_per_ounce: 15, jurisdiction: florida)
        create(:v2_quote, date: Date.yesterday - 8, price_per_ounce: 13, jurisdiction: florida)
        create(:v2_quote, date: Date.yesterday - 9, price_per_ounce: 13)
  
        # when daily prices are queried 
        get "/v2/daily", params: { date: (Date.yesterday - 5).to_s, jurisdiction: "Florida" } # in between yesterday and 7 days ago
  
        # expect two different 
        expect(response).to have_http_status(:success)
        json = JSON.parse(response.body)
        expect(json.length).to eq(1)
        expect(json[0]["date"]).to eq((Date.yesterday - 6).to_s)
        expect(json[0]["avg_price_per_ounce"]).to eq("15.0")
        expect(json[0]["jurisdiction"]).to eq("Florida")
      end
    end
  end
end
