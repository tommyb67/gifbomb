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

ActiveRecord::Schema.define(version: 20131113151942) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "gifs", force: true do |t|
    t.text     "url",        null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "gifs_users", force: true do |t|
    t.integer "user_id", null: false
    t.integer "gif_id",  null: false
  end

  create_table "users", force: true do |t|
    t.string   "username",                                                                                                             null: false
    t.string   "email",                                                                                                                null: false
    t.string   "password_digest",                                                                                                      null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "admin",           default: false
    t.string   "avatar",          default: "http://community.bhf.org.uk/sites/default/files/profile_images/bhf_generic-avatar_01.png"
  end

end
