#  id               :integer          not null, primary key
#  body             :text             not null
#  user_id          :integer          not null
#  commentable_id   :integer          not null
#  commentable_type :string           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null

class AddPostIdToComments < ActiveRecord::Migration
  def change
    remove_column :comments, :commentable_id
    remove_column :comments, :commentable_type
    add_column :comments, :post_id, :integer, null: false
    add_column :comments, :parent_comment_id, :integer, null: false
    add_index :comments, :post_id
    add_index :comments, :parent_comment_id
  end
end
