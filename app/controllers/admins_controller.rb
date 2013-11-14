class AdminsController < ApplicationController

    before_action :set_user, only: [:show, :demote, :promote]
    # before_action :logged_in?, :authenticated!, :authorized!

        def index

          if logged_in?

            @users = User.all
            @user = User.find(session[:user_id])

            if @user.admin == true
                render :index
            else
                redirect_to root_path
            end

         else
             redirect_to root_path
        end
     end

        def destroy
            User.destroy(params[:id])
            redirect_to admins_path
        end


        def promote

            @user.admin = true
            @user.save
            redirect_to admins_path

        end

        def demote

            @user.admin = false
            @user.save
            redirect_to admins_path

        end

    private

    def logged_in?
        session[:user_id].present?
    end

    def authenticated!
        unless logged_in?
      
        end
    end

    def authorized!
        @user = User.find(session[:user_id])
    end

    def set_user
        @user = User.find(params[:id])
    end
end