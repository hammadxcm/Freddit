json.extract! sub, :id, :title, :description
json.imageUrl sub.image.url

if include_posts
  json.posts posts, partial: 'api/posts/post', as: :post
end
