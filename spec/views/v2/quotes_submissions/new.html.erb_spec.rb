require 'rails_helper'

RSpec.describe "v2/quotes_submissions/new", type: :view do
  before(:each) do
    assign(:v2_quotes_submission, V2::QuotesSubmission.new())
  end

  it "renders new v2_quotes_submission form" do
    render

    assert_select "form[action=?][method=?]", v2_quotes_submissions_path, "post" do
    end
  end
end
