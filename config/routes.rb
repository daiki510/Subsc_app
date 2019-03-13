Rails.application.routes.draw do
  root 'subscriptions#index'

  devise_for :users, controllers: {
    registrations: 'users/registrations'
  }
  resources :users, only: [:index,:show]

  resources :subscriptions do
    resources :additions, only: [:create, :destroy]
  end
end
