class V2::Quote < ApplicationRecord
  belongs_to :v2_jurisdiction, class_name: "V2::Jurisdiction"
end
