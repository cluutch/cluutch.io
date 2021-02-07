class CreateV2Quotes < ActiveRecord::Migration[6.1]
  def change
    create_table :v2_quotes do |t|
      t.date :date
      t.string :vendor_name
      t.string :vendor_url
      t.string :vendor_branch
      t.boolean :is_primary
      t.decimal :price_per_ounce
      t.references :v2_jurisdiction, null: false, foreign_key: true

      t.timestamps
    end
  end
end
