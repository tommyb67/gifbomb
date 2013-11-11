class CreateTables < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :email, null: false
      t.string :password_digest, null: false

      t.timestamps
    end

    create_table :gifs do |t|
      t.text :url, null: false

      t.timestamps
    end

    create_table :gifs_users do |t|
      t.belongs_to :user, null: false
      t.belongs_to :gif, null: false
    end

    reversible do |dir|
      dir.up do
        execute <<-SQL
          ALTER TABLE gifs_users
          ADD CONSTRAINT fk_users
          FOREIGN KEY (user_id)
          REFERENCES users(id),
          ADD CONSTRAINT fk_gifs
          FOREIGN KEY (gif_id)
          REFERENCES gifs(id)
        SQL
      end
    end
  end
end