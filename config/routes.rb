Gifbomb::Application.routes.draw do
  resources :gifs
  resources :users

  root "gifs#index"
end
