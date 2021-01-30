class PagesController < ApplicationController
  def home
    @page_title       = 'API for weed prices'
    @page_description = 'An API for the price of weed/marijuana, pulling from legal dispensaries and the darknet. Long term crypto oracle.'
    @page_keywords    = 'Weed, API, Marijuana, Crypto, Oracle, Market, Price'
  end
end
