class V2::DailiesController < ApplicationController
  before_action :set_default_response_format

  def index
    selected_jurisdiction = params[:j] || "All U.S."
    @v2_avg_prices = V2::AvgPrice.where(jurisdiction: selected_jurisdiction).order(date: :desc)
  end

  protected

  def set_default_response_format
    request.format = :json
  end
end
