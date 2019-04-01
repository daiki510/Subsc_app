class CreateDetails < ActiveRecord::Migration[5.2]
  def change
    create_table :details do |t|
      t.references :user, foreign_key: true
      t.references :subscription, foreign_key: true
      t.integer :charge, default: "", null: false
      t.date :due_date, default: "", null: false
      t.string :payment_type, default: "", null: false
      t.text :note, default: "", null: false

      t.timestamps
    end
  end
end
