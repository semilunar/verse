class AddAuthorToConversations < ActiveRecord::Migration[6.0]
  def change
    add_column :conversations, :author, :string
  end
end
