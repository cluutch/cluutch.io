require "test_helper"

class V2::QuotesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @v2_quote = v2_quotes(:one)
  end

  test "should get index" do
    get v2_quotes_url
    assert_response :success
  end

  test "should get new" do
    get new_v2_quote_url
    assert_response :success
  end

  test "should create v2_quote" do
    assert_difference('V2::Quote.count') do
      post v2_quotes_url, params: { v2_quote: { is_primary: @v2_quote.is_primary, price_per_ounce: @v2_quote.price_per_ounce, v2_jurisdiction_id: @v2_quote.v2_jurisdiction_id, vendor_branch: @v2_quote.vendor_branch, vendor_name: @v2_quote.vendor_name, vendor_url: @v2_quote.vendor_url } }
    end

    assert_redirected_to v2_quote_url(V2::Quote.last)
  end

  test "should show v2_quote" do
    get v2_quote_url(@v2_quote)
    assert_response :success
  end

  test "should get edit" do
    get edit_v2_quote_url(@v2_quote)
    assert_response :success
  end

  test "should update v2_quote" do
    patch v2_quote_url(@v2_quote), params: { v2_quote: { is_primary: @v2_quote.is_primary, price_per_ounce: @v2_quote.price_per_ounce, v2_jurisdiction_id: @v2_quote.v2_jurisdiction_id, vendor_branch: @v2_quote.vendor_branch, vendor_name: @v2_quote.vendor_name, vendor_url: @v2_quote.vendor_url } }
    assert_redirected_to v2_quote_url(@v2_quote)
  end

  test "should destroy v2_quote" do
    assert_difference('V2::Quote.count', -1) do
      delete v2_quote_url(@v2_quote)
    end

    assert_redirected_to v2_quotes_url
  end
end
