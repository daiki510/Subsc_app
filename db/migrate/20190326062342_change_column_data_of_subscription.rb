class ChangeColumnDataOfSubscription < ActiveRecord::Migration[5.2]
  def change
    change_column :subscriptions, :icon, :text, default: "", null: false
  end
end
