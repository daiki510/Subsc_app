class AddColumnToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :notification_status, :integer, default: 1, null: false
  end
end
