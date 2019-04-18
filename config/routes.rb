Rails.application.routes.draw do
  root 'top#index'

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  devise_for :users, controllers: {
    registrations: 'users/registrations',
    omniauth_callbacks: "users/omniauth_callbacks"
  }
  resources :users, only: [:show]
  
  resources :services do
    post :import, on: :collection
  end
  
  resources :subscriptions, except: [:index]

  resources :contacts, only: [:new, :create]

  get '*path', controller: 'application', action: 'render_404'
end
