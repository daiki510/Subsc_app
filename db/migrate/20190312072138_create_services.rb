class CreateServices < ActiveRecord::Migration[5.2]
  def change
    create_table :services do |t|
      t.string :name, default: "", null: false
      t.text :icon, default: "", null: false
      t.text :summary, default: "",null: false
      t.integer :status, default: 0, null: false

      t.timestamps
    end
  end
end
