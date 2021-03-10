class UpdateV2AvgPricesToVersion3 < ActiveRecord::Migration[6.1]
  def change
    update_view :v2_avg_prices, version: 3, revert_to_version: 2
  end
end
