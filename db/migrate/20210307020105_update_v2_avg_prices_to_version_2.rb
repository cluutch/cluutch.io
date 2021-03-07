class UpdateV2AvgPricesToVersion2 < ActiveRecord::Migration[6.1]
  def change
    update_view :v2_avg_prices, version: 2, revert_to_version: 1
  end
end
