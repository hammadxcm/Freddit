class RemoveNullConstraintFromParentCommentId < ActiveRecord::Migration[4.2]
  def change
    change_column :comments, :parent_comment_id, :integer, :null => true
  end
end
