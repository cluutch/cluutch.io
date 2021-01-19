require "test_helper"

class QuoteTest < ActiveSupport::TestCase
  test "computes the mean price" do
    quote = Quote.new date: Date.today, currency: "XXX", 
      market1_price_per_oz: 1.5, market2_price_per_oz: 3.5, 
      market3_price_per_oz: 3, market4_price_per_oz: 2 
    quote.save

    assert quote.mean_price_per_oz == 2.5
  end
end
