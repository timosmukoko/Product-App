class Product < ApplicationRecord
  # Validation for the 'name' attribute: ensures that it's present.
  validates :name, presence: true
  
  # Validation for the 'price' attribute:
  # Ensures that 'price' is present and greater than 0.
  validates :price, presence: true, numericality: { greater_than: 0 }

  # Validation for the 'available' attribute:
  # Ensures that 'available' is either true or false.
  validates :available, inclusion: { in: [true, false] }

  # Default availability is set to 'true' for new products.
  # This callback will run only when a new product is created (if it's a new record).
  after_initialize :set_default_availability, if: :new_record?

  private

  # Set the default availability to true if it's not provided.
  def set_default_availability
    self.available ||= true
  end
end
