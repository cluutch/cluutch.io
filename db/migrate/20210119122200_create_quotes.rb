class CreateQuotes < ActiveRecord::Migration[6.1]
  def change
    create_table :quotes do |t|
      t.date :date
      t.string :currency
      t.decimal :mean_price_per_oz
      t.decimal :market1_price_per_oz
      t.decimal :market2_price_per_oz
      t.decimal :market3_price_per_oz
      t.decimal :market4_price_per_oz

      t.timestamps
    end
  end
end
