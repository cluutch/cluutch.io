require "test_helper"

class V2::JurisdictionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @v2_jurisdiction = v2_jurisdictions(:one)
  end

  test "should get index" do
    get v2_jurisdictions_url
    assert_response :success
  end

  test "should get new" do
    get new_v2_jurisdiction_url
    assert_response :success
  end

  test "should create v2_jurisdiction" do
    assert_difference('V2::Jurisdiction.count') do
      post v2_jurisdictions_url, params: { v2_jurisdiction: { name: @v2_jurisdiction.name } }
    end

    assert_redirected_to v2_jurisdiction_url(V2::Jurisdiction.last)
  end

  test "should show v2_jurisdiction" do
    get v2_jurisdiction_url(@v2_jurisdiction)
    assert_response :success
  end

  test "should get edit" do
    get edit_v2_jurisdiction_url(@v2_jurisdiction)
    assert_response :success
  end

  test "should update v2_jurisdiction" do
    patch v2_jurisdiction_url(@v2_jurisdiction), params: { v2_jurisdiction: { name: @v2_jurisdiction.name } }
    assert_redirected_to v2_jurisdiction_url(@v2_jurisdiction)
  end

  test "should destroy v2_jurisdiction" do
    assert_difference('V2::Jurisdiction.count', -1) do
      delete v2_jurisdiction_url(@v2_jurisdiction)
    end

    assert_redirected_to v2_jurisdictions_url
  end
end
