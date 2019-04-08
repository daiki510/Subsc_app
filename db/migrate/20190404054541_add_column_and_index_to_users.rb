class AddColumnAndIndexToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :provider, :string, null: false, default: "none"
    add_column :users, :uid, :string, null: false, default: ""

    User.reset_column_information
    User.find_each do |user|
      user.uid = SecureRandom.uuid
      user.provider = 'none'
      user.save!
    end

    add_index :users, [:provider,:uid], unique: true
  end
end
