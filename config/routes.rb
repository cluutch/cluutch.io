Rails.application.routes.draw do
  resources :quotes
  namespace :v1 do
    constraints subdomain: 'api' do
      get 'quotes', to: 'quotes#index'
    end
  end
  root :to => "pages#home"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
