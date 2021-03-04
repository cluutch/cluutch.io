require 'rails_helper'

RSpec.describe 'V2::Quote' do           
  it 'can be cloned with all values except price and date' do
    jurisdiction = V2::Jurisdiction.create name: "someplace"
    original = V2::Quote.new date: 2.years.ago, 
      vendor_name: "some vendor", vendor_branch: "some branch",
      is_primary: true, price_per_ounce: 85534.23,
      v2_jurisdiction: jurisdiction

    clone = original.clone

    expect(clone.date).to eq Date.today
    expect(clone.vendor_name).to eq "some vendor"
    expect(clone.vendor_branch).to eq "some branch"
    expect(clone.is_primary).to eq true
    expect(clone.price_per_ounce).to be_nil
    expect(clone.v2_jurisdiction.id).to eq jurisdiction.id
  end
end
