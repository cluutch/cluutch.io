require "application_system_test_case"

class V2::JurisdictionsTest < ApplicationSystemTestCase
  setup do
    @v2_jurisdiction = v2_jurisdictions(:one)
  end

  test "visiting the index" do
    visit v2_jurisdictions_url
    assert_selector "h1", text: "V2/Jurisdictions"
  end

  test "creating a Jurisdiction" do
    visit v2_jurisdictions_url
    click_on "New V2/Jurisdiction"

    fill_in "Name", with: @v2_jurisdiction.name
    click_on "Create Jurisdiction"

    assert_text "Jurisdiction was successfully created"
    click_on "Back"
  end

  test "updating a Jurisdiction" do
    visit v2_jurisdictions_url
    click_on "Edit", match: :first

    fill_in "Name", with: @v2_jurisdiction.name
    click_on "Update Jurisdiction"

    assert_text "Jurisdiction was successfully updated"
    click_on "Back"
  end

  test "destroying a Jurisdiction" do
    visit v2_jurisdictions_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Jurisdiction was successfully destroyed"
  end
end
