Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  root 'subscriptions#index'

  resources :details

  devise_for :users, controllers: {
    registrations: 'users/registrations'
  }
  resources :users, only: [:show]

  resources :subscriptions do
    resources :additions, only: [:create, :destroy]
  end
end
