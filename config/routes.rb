Rails.application.routes.draw do
  root 'subscriptions#index'
  
  resources :users, only: [:show]
  devise_for :users, controllers: {
        registrations: 'users/registrations'
  }

  resources :subscriptions
end
