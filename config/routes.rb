Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'todo_lists#index'
  resources :tasks
  resources :projects
  resources :todo_lists
end
