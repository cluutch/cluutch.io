class V2::Quote < ApplicationRecord
  belongs_to :v2_jurisdiction, class_name: "V2::Jurisdiction"

  def clone
    puts 'clone'
    puts Date.today
    clone_params = { 
      date: Date.today, is_primary: self.is_primary,
      vendor_name: self.vendor_name, vendor_url: self.vendor_url,
      vendor_branch: self.vendor_branch,
      v2_jurisdiction_id: self.v2_jurisdiction_id
     }

     V2::Quote.new clone_params
  end
  
end
