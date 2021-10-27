class AddIsConfirmedToV2QuotesSubmissions < ActiveRecord::Migration[6.1]
  def change
    add_column :v2_quotes_submissions, :is_confirmed, :boolean, default: false, nullable: false
  end
end
