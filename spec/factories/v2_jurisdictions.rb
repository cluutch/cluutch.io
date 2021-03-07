FactoryBot.define do
  factory :v2_jurisdiction, class: "V2::Jurisdiction" do
    sequence(:name) { |place| "Somewhere #{place}" }
  end
end