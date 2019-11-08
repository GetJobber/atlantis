module Types
  class FoodType < Types::BaseObject
    field :name, Types::StringType, null: true
    field :brand, Types::StringType, null: true
    field :id, Types::IntType, null: true
  end
end
