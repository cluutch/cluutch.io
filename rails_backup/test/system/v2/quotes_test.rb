require "application_system_test_case"

class V2::QuotesTest < ApplicationSystemTestCase
  setup do
    @v2_quote = v2_quotes(:one)
  end

  test "visiting the index" do
    visit v2_quotes_url
    assert_selector "h1", text: "V2/Quotes"
  end

  test "creating a Quote" do
    visit v2_quotes_url
    click_on "New V2/Quote"

    check "Is primary" if @v2_quote.is_primary
    fill_in "Price per ounce", with: @v2_quote.price_per_ounce
    fill_in "V2 jurisdiction", with: @v2_quote.v2_jurisdiction_id
    fill_in "Vendor branch", with: @v2_quote.vendor_branch
    fill_in "Vendor name", with: @v2_quote.vendor_name
    fill_in "Vendor url", with: @v2_quote.vendor_url
    click_on "Create Quote"

    assert_text "Quote was successfully created"
    click_on "Back"
  end

  test "updating a Quote" do
    visit v2_quotes_url
    click_on "Edit", match: :first

    check "Is primary" if @v2_quote.is_primary
    fill_in "Price per ounce", with: @v2_quote.price_per_ounce
    fill_in "V2 jurisdiction", with: @v2_quote.v2_jurisdiction_id
    fill_in "Vendor branch", with: @v2_quote.vendor_branch
    fill_in "Vendor name", with: @v2_quote.vendor_name
    fill_in "Vendor url", with: @v2_quote.vendor_url
    click_on "Update Quote"

    assert_text "Quote was successfully updated"
    click_on "Back"
  end

  test "destroying a Quote" do
    visit v2_quotes_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Quote was successfully destroyed"
  end
end
