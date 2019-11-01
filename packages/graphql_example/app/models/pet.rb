class Pet < ApplicationRecord
  belongs_to :food
  has_many :pictures
end
