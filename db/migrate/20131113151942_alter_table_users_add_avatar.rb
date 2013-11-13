class AlterTableUsersAddAvatar < ActiveRecord::Migration
  def change
    add_column :users, :avatar, :string, default: "http://community.bhf.org.uk/sites/default/files/profile_images/bhf_generic-avatar_01.png"
  end
end
