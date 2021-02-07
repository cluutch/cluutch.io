class ApplicationController < ActionController::Base
  before_action :http_authenticate, only: [:new, :create, :edit, :update, :destroy]
 
  def http_authenticate
    return true unless Rails.env == 'production'
    authenticate_or_request_with_http_basic do |username, password|
        username == ENV['HTTP_AUTH_USERNAME'] && password == ENV['HTTP_AUTH_PASSWORD']
    end
  end
end
