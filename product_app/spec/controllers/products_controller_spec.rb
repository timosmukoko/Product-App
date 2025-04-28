require 'rails_helper'

RSpec.describe ProductsController, type: :controller do
  let!(:product) { Product.create(name: "Test Product", price: 10.5) }

  describe "GET index" do
    it "returns success" do
      get :index
      expect(response).to be_successful
    end
  end

  describe "GET show" do
    it "returns the product" do
      get :show, params: { id: product.id }
      expect(response).to be_successful
    end
  end

  describe "POST create" do
    it "creates a new product" do
      expect {
        post :create, params: { product: { name: "New", description: "Desc", price: 20 } }
      }.to change(Product, :count).by(1)
    end
  end

  describe "PUT update" do
    it "updates a product" do
      put :update, params: { id: product.id, product: { name: "Updated Name" } }
      product.reload
      expect(product.name).to eq("Updated Name")
    end
  end

  describe "DELETE destroy" do
    it "deletes the product" do
      expect {
        delete :destroy, params: { id: product.id }
      }.to change(Product, :count).by(-1)
    end
  end
end
