  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
Rails.application.routes.draw do

  namespace :v2 do
    resources :quotes_submissions
  end
  namespace :v2 do
    resources :quotes
    resources :jurisdictions
    resources :quotes_submissions
  end

  namespace :v1 do
    constraints subdomain: 'api' do
      get 'quotes', to: 'quotes#index'
    end
  end

  root :to => "pages#home"
end
