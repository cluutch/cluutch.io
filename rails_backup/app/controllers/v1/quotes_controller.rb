class V1::QuotesController < ApplicationController
  # GET /quotes.json
  def index
    @quotes = Quote.all
  end
end
