class RemoveNullConstraintFromParentCommentId < ActiveRecord::Migration
  def change
    change_column :comments, :parent_comment_id, :integer, :null => true
  end
end
