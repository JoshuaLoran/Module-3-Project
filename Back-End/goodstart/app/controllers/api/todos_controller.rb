class Api::TodosController < ApplicationController
  before_action :find_todo, only: [:update]
  def index
    @todos = Todo.all
    render json: @todos
  end

  def update
    @todo.update(todo_params)
    if @todo.save
      render json: @todo, status: :accepted
    else
      render json: { errors: @todo.errors.full_messages }, status: :unprocessible_entity
    end
  end

  def create
    if Todo.find_by(name: params[:name]) #if username exists
     @todo = Todo.find_by(name: params[:name]) #if username exists
     render json: @todo #return the instance of the todo
   else
     @todo = Todo.create(todo_params) #create todo
     @@all = Todo.all
     render json: @@all
   end
  end
# works on this part
  def destroy
    @todo = Todo.find_by(id: params[:id])
    Todo.delete(@todo)
    @@all = Todo.all
    render json: @@all
  end

  private

  def todo_params
    params.permit(:name, :description, :user_id, :id)
  end

  def find_todo
    @todo = Todo.find(params[:id])
  end
end
