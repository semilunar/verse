class MessagesController < ApplicationController
  def create
    message = Message.new(message_params)
    conversation = Conversation.find(message_params[:conversation_id])

    if message.save
      puts 'BEFORE'
      serialized_data = ActiveModelSerializers::Adapter::Json.new(
        MessageSerializer.new(message)
      ).serializable_hash
      puts 'AFTER', serialized_data
      MessagesChannel.broadcast_to conversation, serialized_data
      head :ok
    end
  end

  def typing
    puts '---TYPING---'
    text = params[:typing]
    user = params[:user]
    conversation = Conversation.find(message_params[:conversation_id])

    data = { :typing => { :text => text, :conversation => conversation, :author => user } }
    MessagesChannel.broadcast_to conversation, data
    head :ok
  end

  private

  def message_params
    params.require(:message).permit(:text, :conversation_id, :author)
  end
end
