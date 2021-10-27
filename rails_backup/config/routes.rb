  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
Rails.application.routes.draw do

  namespace :v2 do
    resources :quotes
    resources :jurisdictions
    resources :quotes_submissions
    post 'quotes_submissions/gen', to: 'quotes_submissions#gen', module: :v2, defaults: { format: 'json' }
    get 'daily', to: 'dailies#index'
  end

  namespace :v1 do
    constraints subdomain: 'api' do
      get 'quotes', to: 'quotes#index'
    end
  end

  root :to => "pages#home"
end
