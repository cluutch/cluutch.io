require "application_system_test_case"

class QuotesTest < ApplicationSystemTestCase
  setup do
    @quote = quotes(:one)
  end

  test "visiting the index" do
    visit quotes_url
    assert_selector "h1", text: "Quotes"
  end

  test "creating a Quote" do
    visit quotes_url
    click_on "New Quote"

    fill_in "Currency", with: @quote.currency
    fill_in "Date", with: @quote.date
    fill_in "Market1 price per oz", with: @quote.market1_price_per_oz
    fill_in "Market2 price per oz", with: @quote.market2_price_per_oz
    fill_in "Market3 price per oz", with: @quote.market3_price_per_oz
    fill_in "Market4 price per oz", with: @quote.market4_price_per_oz
    fill_in "Mean price per oz", with: @quote.mean_price_per_oz
    click_on "Create Quote"

    assert_text "Quote was successfully created"
    click_on "Back"
  end

  test "updating a Quote" do
    visit quotes_url
    click_on "Edit", match: :first

    fill_in "Currency", with: @quote.currency
    fill_in "Date", with: @quote.date
    fill_in "Market1 price per oz", with: @quote.market1_price_per_oz
    fill_in "Market2 price per oz", with: @quote.market2_price_per_oz
    fill_in "Market3 price per oz", with: @quote.market3_price_per_oz
    fill_in "Market4 price per oz", with: @quote.market4_price_per_oz
    fill_in "Mean price per oz", with: @quote.mean_price_per_oz
    click_on "Update Quote"

    assert_text "Quote was successfully updated"
    click_on "Back"
  end

  test "destroying a Quote" do
    visit quotes_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Quote was successfully destroyed"
  end
end
