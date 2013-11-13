Gifbomb::Application.routes.draw do
  resources :gifs
  resources :users
  resource :session, only: [:new, :create, :destroy]

  resources :admins do
    member do
      post "promote"
    end
    member do
      post "demote"
    end
  end

  root "gifs#index"
end
