class V2::Jurisdiction < ApplicationRecord
  has_many :quotes, class_name: "V2::Quote", inverse_of: :jurisdiction, foreign_key: :v2_quotes_submission_id
end
