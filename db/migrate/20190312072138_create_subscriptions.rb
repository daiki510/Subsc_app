class CreateSubscriptions < ActiveRecord::Migration[5.2]
  def change
    create_table :subscriptions do |t|
      t.string :name, default: "", null: false
      t.text :icon
      t.text :summary, default: "",null: false
      t.integer :status, default: 0, null: false

      t.timestamps
    end
  end
end
