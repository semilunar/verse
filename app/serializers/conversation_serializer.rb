class ConversationSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :finished
  has_many :messages
end
