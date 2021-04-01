class ApplicationController < ActionController::Base
  protect_from_forgery unless: -> { request.format.json? }
  before_action :http_authenticate, only: [:new, :create, :edit, :update, :destroy]
 
  def http_authenticate
    # return true unless Rails.env == 'production'
    authenticate_or_request_with_http_basic do |username, password|
        expected_username = ENV['HTTP_AUTH_USERNAME'] || 'cluutch'
        expected_password = ENV['HTTP_AUTH_PASSWORD'] || 'cluutch.io'
        username == expected_username && password == expected_password
    end
  end
end
