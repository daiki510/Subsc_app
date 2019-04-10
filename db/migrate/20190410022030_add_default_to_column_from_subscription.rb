class AddDefaultToColumnFromSubscription < ActiveRecord::Migration[5.2]
  def change
    change_column :subscriptions, :charge, :integer, default: 0, null: false
    change_column :subscriptions, :due_date, :integer, default: 1, null: false
  end
end
