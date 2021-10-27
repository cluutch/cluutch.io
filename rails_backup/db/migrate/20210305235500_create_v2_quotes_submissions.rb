class CreateV2QuotesSubmissions < ActiveRecord::Migration[6.1]
  def change
    create_table :v2_quotes_submissions do |t|

      t.timestamps
    end
  end
end
