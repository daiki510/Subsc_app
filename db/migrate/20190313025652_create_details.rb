class CreateDetails < ActiveRecord::Migration[5.2]
  def change
    create_table :details do |t|
      t.references :user, foreign_key: true
      t.references :subscription, foreign_key: true
      t.integer :charge, null: false, default: ""
      t.date :due_date, null: false, default: ""
      t.string :payment_type, null: false, default: ""
      t.text :note, null: false, default: ""

      t.timestamps
    end
  end
end
