class AdminsController < ApplicationController

    before_action :set_user, only: [:show, :demote, :promote]
    before_action :authenticated!, :authorized!, only: [:new]

        def index
          @users = User.all
          @user = User.find(session[:user_id])

          if @user.admin == true
                render :index
            else
                redirect_to root
            end
        end

        def destroy
            User.destroy(params[:id])
            redirect_to admins_path
        end

        # def show
        #         @users = User.find(session[:user_id])

        #         if @user.admin == false
        #                 redirect_to admins_path
        #         end
        # end

        # def new

        # end

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

    def authorized!
        @user = User.find(session[:user_id])
    end

    def set_user
        @user = User.find(params[:id])
    end
end