class V2::QuotesSubmission < ApplicationRecord
  has_many :quotes, class_name: "V2::Quote", inverse_of: :quotes_submission, foreign_key: :v2_quotes_submission_id
  accepts_nested_attributes_for :quotes
end
