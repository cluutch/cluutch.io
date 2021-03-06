class V2::Quote < ApplicationRecord
  belongs_to :jurisdiction, class_name: "V2::Jurisdiction", inverse_of: :quotes, foreign_key: :v2_jurisdiction_id
  belongs_to :quotes_submission, class_name: "V2::QuotesSubmission", inverse_of: :quotes, foreign_key: :v2_quotes_submission_id, optional: true
  
  def clone
    clone_params = { 
      date: Date.today, is_primary: self.is_primary,
      vendor_name: self.vendor_name, vendor_url: self.vendor_url,
      vendor_branch: self.vendor_branch,
      v2_jurisdiction_id: self.v2_jurisdiction_id
     }

     V2::Quote.new clone_params
  end
  
end
