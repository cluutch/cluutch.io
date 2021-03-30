class V2::AvgPrice < ApplicationRecord

  scope :on_date, ->(date) { where('DATE(date) = ?', date) if date.present? }

  scope :on_or_before_date, ->(date) {
    return on_date(date) if (on_date(date).length > 0)
    return where('date <= ?', date).order(date: :desc) if date.present? 
  }

  scope :most_recent_on_or_before_date, ->(date) {
    on_or_before_date(date).limit(1) if date.present?
  }

  # def self.most_recent_on_or_before_date(date)
  #   closest_avg_price = on_or_before_date(date).first
  #   closest_avg_price.date = date
    
  #   return [closest_avg_price]
  # end

  # this isn't strictly necessary, but it will prevent
  # rails from calling save, which would fail anyway.
  def readonly?
    true
  end
end