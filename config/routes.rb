Rails.application.routes.draw do
  root 'page#index'

  resources :conversations, only: [:index, :create]
  resources :messages, only: [:create]

  post 'typing', to: 'messages#typing'
  mount ActionCable.server => '/cable'
end
