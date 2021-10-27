class CreateV2AvgPrices < ActiveRecord::Migration[6.1]
  def change
    create_view :v2_avg_prices
  end
end
