class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.integer :user_id, null: false
      t.integer :sub_id, null: false
      t.string :title, null: false
      t.text :body, null: false

      t.timestamps null: false
    end
    
    add_index :posts, :user_id
    add_index :posts, :sub_id
  end
end
