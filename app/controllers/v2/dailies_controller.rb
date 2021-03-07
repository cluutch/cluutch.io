class V2::DailiesController < ApplicationController
  before_action :set_default_response_format

  def index
    selected_jurisdiction = params[:jurisdiction] || "All U.S."
    date = params[:date]
    @v2_avg_prices = V2::AvgPrice.where(jurisdiction: selected_jurisdiction).most_recent_on_or_before_date(date).order(date: :desc)
  end

  protected

  def set_default_response_format
    request.format = :json
  end
end
