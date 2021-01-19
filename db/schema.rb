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

ActiveRecord::Schema.define(version: 2021_01_19_122200) do

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

end
