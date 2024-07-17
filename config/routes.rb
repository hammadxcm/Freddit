Rails.application.routes.draw do

  root "static_pages#root"

  namespace :api, constraints: { format: 'json' } do

    resources :users, only: [:index, :create, :destroy]

    resource :session, only: [:create, :show, :destroy]
    resources :comments, only: [:create, :destroy] do
      member do
        post "upvote"
        post "downvote"
      end
    end

    resources :posts, only: [:index, :show, :create] do
      member do
        post "upvote"
        post "downvote"
      end
    end

    resources :subs, only: [:index, :show]

  end

end
