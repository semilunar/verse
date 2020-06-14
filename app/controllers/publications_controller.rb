class PublicationsController < ApplicationController
  def index
    publications = Publication.all
    render json: publications.reverse
  end

  def create
    conversation = Conversation.find(params[:conversation_id])
    if conversation.author != params[:author]
      puts 'AUTHOR PROBLEM'
      render json: {message: 'no rights'}
      return
    end

    publication = Publication.new()
    authors = []
    content = ''
    conversation.messages.each_with_index do |message, index|
      text = ''
      if index > 0
        text = " " + message.text.split(' ').drop(1).join(" ")
      else
        text = message.text
      end
      content += text

      author = message.author.split(' ')[0]
      if !authors.include? author
         authors.push(author)
      else
        # no
      end

    end

    publication.title = conversation.title
    publication.authors = authors.join(' ')
    publication.content = content

    if publication.save
      render json: {message: 'ok', publication: publication}
    else
      render json: {message: 'sth went wrong'}
    end
  end

  def destroy
    publication = Publication.find(params[:id])
    if publication
      publication.destroy
      render json: {message: 'ok'}
    end
  end
end
