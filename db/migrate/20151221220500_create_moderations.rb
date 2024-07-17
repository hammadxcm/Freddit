class CreateModerations < ActiveRecord::Migration
  def change
    create_table :moderations do |t|
      t.integer :user_id, null: false
      t.integer :sub_id, null: false

      t.timestamps null: false
    end
    add_index :moderations, [:user_id, :sub_id], unique: true
    add_index :moderations, [:sub_id]
  end
end
