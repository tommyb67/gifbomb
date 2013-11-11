class UsersController < ApplicationController

  before_action :authenticated!, :set_user, :authorized!, except: [:new, :create]

  def index
    @user = User.all
  end
  def create
    @user = User.new(user_params)
    binding.pry

    if @user.save
      render json: @user
    else
      render status: 400, nothing: true
    end

  end
  def update
    @user = User.find(params[:id])

    if @user.update(user_params)
      render status: 200, nothing: true
    else
      render status: 400, nothing: true
    end

  end
  def destroy
    @user = User.find(params[:id])

    if @user.destroy
      session[:user_id] = nil
      render json: {}
    else
      render status: 400, nothing: true
    end

  end


# whitelisting
  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end

  def set_user
    @user = User.find(params[:id])
  end
  def authorized!
    unless @user.id == session[:user_id]
    end
  end
  
end