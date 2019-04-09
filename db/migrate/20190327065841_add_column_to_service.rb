class AddColumnToService < ActiveRecord::Migration[5.2]
  def change
    add_column :services, :link, :text, default: "", null: false
  end
end
