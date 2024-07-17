json.extract! post, :id, :user_id, :sub_id, :title, :body

json.created_at post.created_at.iso8601
json.updated_at post.updated_at.iso8601
json.comments post.comments

json.score post.score

json.sub do
  json.title post.sub.title
end

json.user do
  json.username post.user.username
end


# json.posts post.comments, partial: 'api/comments/comment', as: :comment
json.comments (@comments || post.comments) do |comment|
  json.extract! comment, :id, :body, :user_id, :parent_comment_id, :post_id, :created_at
  json.user comment.user
  json.votes comment.votes
  json.score comment.votes.inject(0) { |sum, v| sum + v.value }
end


json.votes post.votes do |vote|
  json.extract! vote, :id, :user_id, :value
end
