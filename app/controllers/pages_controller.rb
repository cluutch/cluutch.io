class PagesController < ApplicationController
  def home
    @page_title       = 'API for weed prices'
    @page_description = 'An API for the price of weed/marijuana, pulling from legal dispensaries and the darknet. Long term crypto oracle.'
    @page_keywords    = 'Weed, API, Marijuana, Crypto, Oracle, Market, Price'

    @selected_jurisdiction = params[:j] || "All U.S."
    selected_avg = V2::AvgPrice.where(jurisdiction: @selected_jurisdiction).order(date: :desc).first

    @price_today = selected_avg ? selected_avg.avg_price_per_ounce.round(2) : -1
    @jurisdictions = V2::AvgPrice.pluck(:jurisdiction).uniq.sort
  end
end
