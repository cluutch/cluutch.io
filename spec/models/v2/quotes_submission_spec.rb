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

  it 'has a uuid and confirmation token that does not change' do
    submission = V2::QuotesSubmission.create

    uuid = submission.uuid
    expect(uuid).to be_truthy

    confirmation_token = submission.confirmation_token
    expect(confirmation_token).to be_truthy

    # force a new save
    submission.update(is_confirmed: true)

    # expect no changes
    expect(submission.uuid).to eq(uuid)
    expect(submission.confirmation_token).to eq(confirmation_token)
  end
end
