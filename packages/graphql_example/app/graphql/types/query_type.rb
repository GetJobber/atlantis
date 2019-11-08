module Types
  class QueryType < Types::BaseObject

    field :food, Types::FoodType, null: false, description: "Get the food" do
      arguement :id, ID, required: true
    end

    def food(id:)
      Food.find(id)
    end
  end
end
