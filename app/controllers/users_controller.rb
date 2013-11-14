class UsersController < ApplicationController

  before_action :set_user, :authorized!, except: [:new, :create]
  before_action :authenticated!
  #FIXME authenticated is an unknown method
  def index
    @user = User.all
  end

  def create
    @user = User.new(user_params)

    if @user.save
      session[:user_id] = @user.id
      render json: @user
    else
      render status: 400, nothing: true
    end

  end

  def favorites
    @user = User.find(params[:id])
    render json: @user.gifs
  end

  def update
    @user = User.find(params[:id])

    if @user.update(user_params)
      render status: 200, nothing: true
    else
      render status: 400, nothing: true
    end

  end

  def show
    @user = User.find(params[:id])
    render json: @user
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
    params.require(:user).permit(:username, :email, :password, :avatar, :password_confirmation)
  end

  def set_user
    @user = User.find(params[:id])
  end

  
  def logged_in?
    session[:user_id].present?
  end
  
  def authenticated!
    unless logged_in?
      
    end
  end

  def authorized!
    unless @user.id == session[:user_id]
    end
  end
  
end