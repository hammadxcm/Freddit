json.array! @subs do |sub|
  json.extract! sub, :id, :title, :description
  json.imageUrl asset_path(sub.bg_image.url)
end
