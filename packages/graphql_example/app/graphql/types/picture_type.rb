module Types
  class PictureType < Types::BaseObject
    field :id, Types::IntType, null: true
    field :url, Types::StringType, null: true
    field :pet, Types::PetType, null: true
  end
end
