class ConversationsController < ApplicationController
  def index
    conversations = Conversation.where(finished: false)
    render json: conversations.reverse
  end

  def create
    conversation = Conversation.new(conversation_params)
    if conversation.save
      serialized_data = ActiveModelSerializers::Adapter::Json.new(
        ConversationSerializer.new(conversation)
      ).serializable_hash
      ActionCable.server.broadcast 'conversations_channel', serialized_data
      head :ok
    end
  end

  def destroy
    conversation = Conversation.find(params[:id])
    if conversation
      conversation.finished = true
      # conversation.destroy
      conversation.save
      render json: {message: 'ok'}
    end
  end

  private

  def conversation_params
    params.require(:conversation).permit(:title, :author, :finished)
  end
end
