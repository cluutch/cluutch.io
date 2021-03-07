require 'rails_helper'

RSpec.describe V2::QuotesSubmission, type: :model do
  it 'can pregenerate the expected quotes' do
    submission = V2::QuotesSubmission.new_prefilled_form

    expect(submission.quotes.length).to eq(9)

    expect(submission.quotes[0].date).to eq(Date.today)
    expect(submission.quotes[4].date).to eq(Date.today)

    expect(submission.quotes[3].vendor_branch).to eq("Las Vegas")
    
    expect(submission.quotes[6].price_per_ounce).to be_nil
  end
end
