class CreateV2Jurisdictions < ActiveRecord::Migration[6.1]
  def change
    create_table :v2_jurisdictions do |t|
      t.string :name

      t.timestamps
    end
  end
end
