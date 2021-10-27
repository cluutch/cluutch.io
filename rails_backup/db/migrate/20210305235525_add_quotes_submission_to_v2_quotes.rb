class AddQuotesSubmissionToV2Quotes < ActiveRecord::Migration[6.1]
  def change
    add_reference :v2_quotes, :v2_quotes_submission, null: true, foreign_key: true
  end
end
