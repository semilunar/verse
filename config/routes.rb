Rails.application.routes.draw do
  root 'page#index'

  resources :conversations, only: [:index, :create]
  resources :messages, only: [:create]

  post 'typing', to: 'messages#typing'
  post 'deleteconversation', to: 'conversations#destroy'
  
  mount ActionCable.server => '/cable'

  get '*path', to: 'page#index'
end
