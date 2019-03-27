class ChangeColumnDataOfDueDate < ActiveRecord::Migration[5.2]
  def change
    change_column :details, :due_date, :string, null: false, default: ""
  end
end
