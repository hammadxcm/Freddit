class AddDeletedAndUrlToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :url, :string
    add_column :posts, :deleted, :boolean, null: false, default: false
  end
end
