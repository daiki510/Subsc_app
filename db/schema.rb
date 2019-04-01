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

ActiveRecord::Schema.define(version: 2019_04_01_001920) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "additions", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "subscription_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["subscription_id"], name: "index_additions_on_subscription_id"
    t.index ["user_id"], name: "index_additions_on_user_id"
  end

  create_table "categories", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "category_subscs", force: :cascade do |t|
    t.bigint "category_id"
    t.bigint "subscription_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_category_subscs_on_category_id"
    t.index ["subscription_id"], name: "index_category_subscs_on_subscription_id"
  end

  create_table "contacts", force: :cascade do |t|
    t.string "title", default: "", null: false
    t.string "email", default: "", null: false
    t.text "message", default: "", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["user_id"], name: "index_contacts_on_user_id"
  end

  create_table "details", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "subscription_id"
    t.integer "charge", null: false
    t.string "due_date", null: false
    t.string "payment_type", default: "", null: false
    t.text "note", default: "", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["subscription_id"], name: "index_details_on_subscription_id"
    t.index ["user_id"], name: "index_details_on_user_id"
  end

  create_table "subscriptions", force: :cascade do |t|
    t.string "name", null: false
    t.text "icon", default: "", null: false
    t.text "summary", null: false
    t.integer "status", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "link", default: "", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.string "email", default: "", null: false
    t.boolean "admin", default: false, null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "additions", "subscriptions"
  add_foreign_key "additions", "users"
  add_foreign_key "category_subscs", "categories"
  add_foreign_key "category_subscs", "subscriptions"
  add_foreign_key "contacts", "users"
  add_foreign_key "details", "subscriptions"
  add_foreign_key "details", "users"
end
