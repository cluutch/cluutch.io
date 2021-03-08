class AddUuidAndValidationTokenToV2QuotesSubmissions < ActiveRecord::Migration[6.1]
  def change
    add_column :v2_quotes_submissions, :uuid, :uuid
    add_index :v2_quotes_submissions, :uuid

    add_column :v2_quotes_submissions, :confirmation_token, :uuid
    add_index :v2_quotes_submissions, :confirmation_token
  end
end
