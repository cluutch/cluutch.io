require 'rails_helper'

RSpec.describe 'V2::AvgPrice' do           
  it "on_date returns returns today's quote" do
    create(:v2_quote, date: Date.today, price_per_ounce: 32)
    create(:v2_quote, date: Date.today, price_per_ounce: 34)
    create(:v2_quote, date: Date.yesterday, price_per_ounce: 35)
    create(:v2_quote, date: Date.yesterday, price_per_ounce: 37)
    create(:v2_quote, date: Date.yesterday - 6, price_per_ounce: 313)

    prices = V2::AvgPrice.on_date(Date.today.to_s)

    expect(prices.length).to eq(3) # one version per jurisdiction
  end

  it "prices less than 20 not counted in average because they are considered invalid" do
    somewhere = create(:v2_jurisdiction)
    create(:v2_quote, date: Date.today, price_per_ounce: 32, jurisdiction: somewhere)
    create(:v2_quote, date: Date.today, price_per_ounce: 34, jurisdiction: somewhere)
    create(:v2_quote, date: Date.today, price_per_ounce: 19, jurisdiction: somewhere)
    create(:v2_quote, date: Date.today, price_per_ounce: 0, jurisdiction: somewhere)
    create(:v2_quote, date: Date.today, price_per_ounce: -1, jurisdiction: somewhere)
    create(:v2_quote, date: Date.yesterday, price_per_ounce: 35)
    create(:v2_quote, date: Date.yesterday, price_per_ounce: 37)
    create(:v2_quote, date: Date.yesterday - 6, price_per_ounce: 313)

    prices = V2::AvgPrice.where(date: Date.today.to_s)

    expect(prices.length).to eq(2) # entries created for each jurisdiction, each day plus All U.S.
    expect(prices.first.avg_price_per_ounce).to eq(33) # prices less than 20 ignored
  end

  it "on_or_before_date returns the most recent dates without going past" do
    create(:v2_quote, date: Date.today, price_per_ounce: 32)
    create(:v2_quote, date: Date.today, price_per_ounce: 34)
    create(:v2_quote, date: Date.yesterday, price_per_ounce: 35)
    create(:v2_quote, date: Date.yesterday, price_per_ounce: 37)
    create(:v2_quote, date: Date.yesterday - 6, price_per_ounce: 313)
    create(:v2_quote, date: Date.yesterday - 6, price_per_ounce: 315)
    create(:v2_quote, date: Date.yesterday - 8, price_per_ounce: 313)

    # when daily prices are queried 
    prices = V2::AvgPrice.where(jurisdiction: "All U.S.").on_or_before_date (Date.yesterday - 5).to_s # in between yesterday and 7 days ago

    expect(prices.length).to eq(2) # 7 and 9 days ago
    expect(prices.first.date).to eq(Date.yesterday - 6)
    expect(prices.second.date).to eq(Date.yesterday - 8)
  end

  it "most_recent_on_or_before_date returns the most recent date without going past" do
    create(:v2_quote, date: Date.today, price_per_ounce: 32)
    create(:v2_quote, date: Date.today, price_per_ounce: 34)
    create(:v2_quote, date: Date.yesterday, price_per_ounce: 35)
    create(:v2_quote, date: Date.yesterday, price_per_ounce: 37)
    create(:v2_quote, date: Date.yesterday - 6, price_per_ounce: 313)
    create(:v2_quote, date: Date.yesterday - 6, price_per_ounce: 315)
    create(:v2_quote, date: Date.yesterday - 8, price_per_ounce: 313)

    # when daily prices are queried 
    prices = V2::AvgPrice.where(jurisdiction: "All U.S.").most_recent_on_or_before_date (Date.yesterday - 5).to_s # in between yesterday and 7 days ago

    expect(prices.length).to eq(1)
    expect(prices.first.date).to eq(Date.yesterday - 6)
  end
end
