class Quote < ApplicationRecord
  before_save :calc_mean_price

  private

  def calc_mean_price
    vals = [market1_price_per_oz, 
        market2_price_per_oz, 
        market3_price_per_oz, 
        market4_price_per_oz]
    self.mean_price_per_oz = vals.sum(0.0) / vals.size
  end
end
