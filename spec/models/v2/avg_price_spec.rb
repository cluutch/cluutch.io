require 'rails_helper'

RSpec.describe 'V2::AvgPrice' do           
  it "on_date returns returns today's quote" do
    create(:v2_quote, date: Date.today, price_per_ounce: 2)
    create(:v2_quote, date: Date.today, price_per_ounce: 4)
    create(:v2_quote, date: Date.yesterday, price_per_ounce: 5)
    create(:v2_quote, date: Date.yesterday, price_per_ounce: 7)
    create(:v2_quote, date: Date.yesterday - 6, price_per_ounce: 13)

    prices = V2::AvgPrice.on_date(Date.today.to_s)

    expect(prices.length).to eq(3) # one version per jurisdiction
  end

  it "on_or_before_date returns the most recent dates without going past" do
    create(:v2_quote, date: Date.today, price_per_ounce: 2)
    create(:v2_quote, date: Date.today, price_per_ounce: 4)
    create(:v2_quote, date: Date.yesterday, price_per_ounce: 5)
    create(:v2_quote, date: Date.yesterday, price_per_ounce: 7)
    create(:v2_quote, date: Date.yesterday - 6, price_per_ounce: 13)
    create(:v2_quote, date: Date.yesterday - 6, price_per_ounce: 15)
    create(:v2_quote, date: Date.yesterday - 8, price_per_ounce: 13)

    # when daily prices are queried 
    prices = V2::AvgPrice.where(jurisdiction: "All U.S.").on_or_before_date (Date.yesterday - 5).to_s # in between yesterday and 7 days ago

    expect(prices.length).to eq(2) # 7 and 9 days ago
    expect(prices.first.date).to eq(Date.yesterday - 6)
    expect(prices.second.date).to eq(Date.yesterday - 8)
  end

  it "most_recent_on_or_before_date returns the most recent date without going past" do
    create(:v2_quote, date: Date.today, price_per_ounce: 2)
    create(:v2_quote, date: Date.today, price_per_ounce: 4)
    create(:v2_quote, date: Date.yesterday, price_per_ounce: 5)
    create(:v2_quote, date: Date.yesterday, price_per_ounce: 7)
    create(:v2_quote, date: Date.yesterday - 6, price_per_ounce: 13)
    create(:v2_quote, date: Date.yesterday - 6, price_per_ounce: 15)
    create(:v2_quote, date: Date.yesterday - 8, price_per_ounce: 13)

    # when daily prices are queried 
    prices = V2::AvgPrice.where(jurisdiction: "All U.S.").most_recent_on_or_before_date (Date.yesterday - 5).to_s # in between yesterday and 7 days ago

    expect(prices.length).to eq(1)
    expect(prices.first.date).to eq(Date.yesterday - 6)
  end
end
