json.extract! comment, :id, :body, :user_id, :parent_comment_id, :post_id, :created_at
json.user comment.user
json.score comment.score
json.votes comment.votes
