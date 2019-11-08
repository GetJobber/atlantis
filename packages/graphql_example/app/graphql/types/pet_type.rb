module Types
  class PetType < Types::BaseObject
    field :id, Types::IntType, null: true
    field :name, Types::StringType, null: true
    field :age, Types::IntType, null: true
    field :breed, Types::StringType, null: true
    field :food, Types::FoodType, null: true
  end
end
