Gifbomb::Application.routes.draw do
  resources :gifs
  resources :users
  resource :session, only: [:new, :create, :destroy]

  root "gifs#index"
end
