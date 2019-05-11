class CreateClips < ActiveRecord::Migration[5.2]
  def change
    create_table :clips do |t|
      t.references :user, foreign_key: true
      t.references :service, foreign_key: true

      t.timestamps
    end
    add_index :clips, [:user_id, :service_id], unique: true
  end
end
