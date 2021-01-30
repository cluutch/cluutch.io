class PagesController < ApplicationController
  def home
    @page_title       = 'API for weed prices'
    @page_description = 'An API for the price of weed/marijuana, pulling from legal dispensaries and the darknet. Long term crypto oracle.'
    @page_keywords    = 'Weed, API, Marijuana, Crypto, Oracle, Market, Price'

    newest_quote = Quote.all.order(date: :desc).first
    @price_today = newest_quote.mean_price_per_oz.round(2)
  end
end
