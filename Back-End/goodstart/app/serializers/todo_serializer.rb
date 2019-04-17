class TodoSerializer < ActiveModel::Serializer
  belongs_to :user
  attributes :name, :description, :user_id, :id
end
