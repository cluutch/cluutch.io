json.extract! v2_quotes_submission, :id, :uuid, :created_at
json.url edit_v2_quotes_submission_url(v2_quotes_submission, uuid: v2_quotes_submission[:uuid])
