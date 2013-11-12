class SessionsController < ApplicationController

  def new
    render nothing: true
  end

  def create
    @user = User.find_by(email: params[:user][:email])
    
    if @user && @user.authenticate(params[:user][:password])
      session[:user_id] = @user.id
      render status: 200, nothing: true
    else
      render status: 400, nothing: true
    end

  end

  def destroy
    session[:user_id] = nil
    render status: 200, nothing: true
  end

end