class MessageSerializer < ActiveModel::Serializer
  attributes :id, :conversation_id, :text, :author, :created_at
end
