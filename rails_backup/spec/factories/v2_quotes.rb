FactoryBot.define do
  factory :v2_quote, class: "V2::Quote" do
    jurisdiction { association :v2_jurisdiction }
  end
end