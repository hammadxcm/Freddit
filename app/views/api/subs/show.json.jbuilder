json.extract! @sub, :id, :title, :description
json.imageUrl asset_path(@sub.bg_image.url)

json.posts @posts, partial: 'api/posts/post', as: :post
