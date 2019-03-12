class CreateUserSubscs < ActiveRecord::Migration[5.2]
  def change
    create_table :user_subscs do |t|
      t.references :user, foreign_key: true
      t.references :subscription, foreign_key: true

      t.timestamps
    end
  end
end
