require 'rails_helper'

RSpec.describe "v2/quotes_submissions/index", type: :view do
  before(:each) do
    assign(:v2_quotes_submissions, [
      V2::QuotesSubmission.create!(),
      V2::QuotesSubmission.create!()
    ])
  end

  it "renders a list of v2/quotes_submissions" do
    render
  end
end
