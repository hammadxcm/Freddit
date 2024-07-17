class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :body, null: false
      t.integer :user_id, null: false
      t.references :commentable, polymorphic: true, index: true, null: false

      t.timestamps null: false
    end
  end
end
