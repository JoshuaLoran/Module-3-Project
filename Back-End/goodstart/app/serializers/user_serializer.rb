class UserSerializer < ActiveModel::Serializer
  has_many :todos
  attributes :name, :email, :worklocation, :id
end
