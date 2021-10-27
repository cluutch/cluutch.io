require 'rails_helper'

RSpec.describe "v2/quotes_submissions/edit", type: :view do
  before(:each) do
    @v2_quotes_submission = assign(:v2_quotes_submission, V2::QuotesSubmission.create!())
  end

  it "renders the edit v2_quotes_submission form" do
    render

    assert_select "form[action=?][method=?]", v2_quotes_submission_path(@v2_quotes_submission), "post" do
    end
  end
end
