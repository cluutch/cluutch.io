class PagesController < ApplicationController
  def home
    redirect_to action: "index", controller: "quotes"
  end
end
