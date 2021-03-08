require "securerandom"

class V2::QuotesSubmission < ApplicationRecord
  has_many :quotes, class_name: "V2::Quote", inverse_of: :quotes_submission, foreign_key: :v2_quotes_submission_id
  accepts_nested_attributes_for :quotes
  before_save :set_uuids
  before_save :set_is_confirmed

  def self.new_prefilled_form
    prefilled_quotes = [
      # Florida
      { vendor_name: "Curaleaf", vendor_url: "https://shop-stpetersburgfl.curaleaf.com", vendor_branch: "St Petersburg",
        is_primary: true, v2_jurisdiction_id: 4, date: Date.today },
      
      { vendor_name: "Curaleaf", vendor_url: "https://shop-southorlandofl.curaleaf.com", vendor_branch: "Orlando",
        is_primary: true, v2_jurisdiction_id: 4, date: Date.today },

      { vendor_name: "FLUENT", vendor_url: "https://getfluent.com/dispensaries/jacksonville", vendor_branch: "Jacksonville",
        is_primary: true, v2_jurisdiction_id: 4, date: Date.today },

      # Nevada
      { vendor_name: "Planet 13", vendor_url: "https://www.planet13lasvegas.com/menu/", vendor_branch: "Las Vegas",
        is_primary: true, v2_jurisdiction_id: 5, date: Date.today },

      { vendor_name: "The Dispensary", vendor_url: "https://www.thedispensarynv.com/reno-cannabis-dispensary?dtche%5Bweight%5D=1%2F2oz&dtche%5Bcategory%5D=flower", vendor_branch: "Reno",
        is_primary: true, v2_jurisdiction_id: 5, date: Date.today },

      { vendor_name: "Reef", vendor_url: "https://reefdispensaries.com/locations/sun-valley/order-now/", vendor_branch: "DC",
        is_primary: true, v2_jurisdiction_id: 5, date: Date.today },

      # D.C.
      { vendor_name: "Where's Weed", vendor_url: "https://wheresweed.com/washington-dc/marijuana-delivery/hi-lifedc", vendor_branch: "HiLife",
        is_primary: true, v2_jurisdiction_id: 6, date: Date.today },

      { vendor_name: "Street Lawyer Services", vendor_url: "https://streetlawyerservicesdc.com/store/#todaysmenu", vendor_branch: "DC",
        is_primary: true, v2_jurisdiction_id: 6, date: Date.today },

      { vendor_name: "Takoma Wellness", vendor_url: "https://takomawellness.com/products/online-ordering/?dtche%5Bweight%5D=1oz&dtche%5Bcategory%5D=flower", vendor_branch: "DC",
        is_primary: true, v2_jurisdiction_id: 6, date: Date.today }
    ]

    submission = self.new
    prefilled_quotes.each do |q|
      submission.quotes.build q
    end

    return submission
  end

  private

  def set_uuids
    self.uuid = SecureRandom.uuid unless uuid.present?
    self.confirmation_token = SecureRandom.uuid unless confirmation_token.present?
  end

  def set_is_confirmed
    self.is_confirmed = quotes.all? { |quote| quote.price_per_ounce.present? }
  end
end
