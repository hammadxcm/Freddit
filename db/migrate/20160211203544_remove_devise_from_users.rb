class RemoveDeviseFromUsers < ActiveRecord::Migration
  def change
    drop_table :users

    create_table :users do |t|
      t.string :username, null: false
      t.string :email, null: false
      t.string :password_digest
      t.string :session_token

      t.timestamps null: false
    end
    
    add_index :users, [:username, :email], unique: true
    add_index :users, :email
    add_index :users, :session_token, unique: true
  end
end
