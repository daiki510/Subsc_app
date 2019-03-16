class CreateCategorySubscs < ActiveRecord::Migration[5.2]
  def change
    create_table :category_subscs do |t|
      t.references :category, foreign_key: true
      t.references :subscription, foreign_key: true

      t.timestamps
    end
  end
end
