class CreateServices < ActiveRecord::Migration[5.2]
  def change
    create_table :services do |t|
      t.references :user, foreign_key: true
      t.references :service, foreign_key: true
      t.integer :charge, default: "", null: false
      t.integer :due_date, default: "", null: false
      t.string :payment_type, default: "", null: false
      t.text :note, default: "", null: false

      t.timestamps
    end
  end
end