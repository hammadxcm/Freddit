# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160329144133) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.text     "body",              null: false
    t.integer  "user_id",           null: false
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.integer  "post_id",           null: false
    t.integer  "parent_comment_id"
  end

  add_index "comments", ["parent_comment_id"], name: "index_comments_on_parent_comment_id", using: :btree
  add_index "comments", ["post_id"], name: "index_comments_on_post_id", using: :btree

  create_table "moderations", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "sub_id",     null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "moderations", ["sub_id"], name: "index_moderations_on_sub_id", using: :btree
  add_index "moderations", ["user_id", "sub_id"], name: "index_moderations_on_user_id_and_sub_id", unique: true, using: :btree

  create_table "posts", force: :cascade do |t|
    t.integer  "user_id",                    null: false
    t.integer  "sub_id",                     null: false
    t.string   "title",                      null: false
    t.text     "body",                       null: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.string   "url"
    t.boolean  "deleted",    default: false, null: false
  end

  add_index "posts", ["sub_id"], name: "index_posts_on_sub_id", using: :btree
  add_index "posts", ["user_id"], name: "index_posts_on_user_id", using: :btree

  create_table "subs", force: :cascade do |t|
    t.string   "title",                 null: false
    t.text     "description",           null: false
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.string   "bg_image_file_name"
    t.string   "bg_image_content_type"
    t.integer  "bg_image_file_size"
    t.datetime "bg_image_updated_at"
  end

  add_index "subs", ["title"], name: "index_subs_on_title", unique: true, using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "email",           null: false
    t.string   "password_digest"
    t.string   "session_token"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["username", "email"], name: "index_users_on_username_and_email", unique: true, using: :btree

  create_table "votes", force: :cascade do |t|
    t.integer  "value",        null: false
    t.integer  "user_id",      null: false
    t.integer  "votable_id"
    t.string   "votable_type"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "votes", ["user_id", "votable_id", "votable_type"], name: "index_votes_on_user_id_and_votable_id_and_votable_type", using: :btree
  add_index "votes", ["votable_id"], name: "index_votes_on_votable_id", using: :btree
  add_index "votes", ["votable_type"], name: "index_votes_on_votable_type", using: :btree

end
