require 'rails_helper'

RSpec.describe "v2/quotes_submissions/show", type: :view do
  before(:each) do
    @v2_quotes_submission = assign(:v2_quotes_submission, V2::QuotesSubmission.create!())
  end

  it "renders attributes in <p>" do
    render
  end
end
