# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_02_07_152025) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "quotes", force: :cascade do |t|
    t.date "date"
    t.string "currency"
    t.decimal "mean_price_per_oz"
    t.decimal "market1_price_per_oz"
    t.decimal "market2_price_per_oz"
    t.decimal "market3_price_per_oz"
    t.decimal "market4_price_per_oz"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "v2_jurisdictions", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "v2_quotes", force: :cascade do |t|
    t.date "date"
    t.string "vendor_name"
    t.string "vendor_url"
    t.string "vendor_branch"
    t.boolean "is_primary"
    t.decimal "price_per_ounce"
    t.bigint "v2_jurisdiction_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["v2_jurisdiction_id"], name: "index_v2_quotes_on_v2_jurisdiction_id"
  end

  add_foreign_key "v2_quotes", "v2_jurisdictions"
end
