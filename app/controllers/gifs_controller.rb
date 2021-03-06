class GifsController < ApplicationController
  def index
    if session[:user_id] != nil
    @user = User.find(session[:user_id])
  else
    @user = User.new
  end
    render :index
  end
  def create
    @gif = Gif.new(gif_params)

    if @gif.save
      render json: @gif
    else
      render status: 400, nothing: true
    end

  end

  def favorite
    @gif = Gif.find(params[:id])
    # binding.pry
    if User.find_by(id: session[:user_id]).favorite(@gif)
      render status: 200, nothing: true
    else
      render status:400, nothing:true
    end
  end
  
  def unfavorite
    @gif = Gif.find(params[:id])
    # binding.pry
    if @user.unfavorite(@gif.url)
      render status: 200, nothing: true
    else
      render status: 400, nothing: true
    end
  end



  private

  def gif_params
    params.require(:gif).permit(:url)
  end
end