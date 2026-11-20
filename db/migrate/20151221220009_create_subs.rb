class CreateSubs < ActiveRecord::Migration[4.2]
  def change
    create_table :subs do |t|
      t.string :title, null: false
      t.text :description, null: false

      t.timestamps null: false
    end
    add_index :subs, :title, unique: true
  end
end
