class AddColumnToSubscription < ActiveRecord::Migration[5.2]
  def change
    add_column :subscriptions, :link, :text, default: "", null: false
  end
end
