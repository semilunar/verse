class AddFinishedToConversations < ActiveRecord::Migration[6.0]
  def change
    add_column :conversations, :finished, :boolean, default: false
  end
end
