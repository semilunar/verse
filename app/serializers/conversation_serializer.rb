class ConversationSerializer < ActiveModel::Serializer
  attributes :id, :title, :author
  has_many :messages
end
