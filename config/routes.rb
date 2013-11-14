Gifbomb::Application.routes.draw do
  
  root "gifs#index"
  resources :gifs do
    member do
      post "favorite"
      delete "unfavorite"
    end
  end
  
  resources :users do
    member do
      get "favorites"
    end
  end


  resource :session, only: [:new, :create, :destroy]

  resources :admins do
    member do
      post "promote"
      post "demote"
    end
  end

  
end
