Rails.application.routes.draw do
  namespace :api do
    resources :users
  end
  namespace :api do
    resources :todos
  end
end
