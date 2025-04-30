Rails.application.routes.draw do
  # Health check
  get "up" => "rails/health#show", as: :rails_health_check

  # Namespace all product routes under /api
  namespace :api do
    resources :products
  end

  # Optional: Define root if needed
  # root "api/products#index"
end
