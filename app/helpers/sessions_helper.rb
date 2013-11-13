module SessionsHelper

  def logged_in?
    session[:user_id].present?
  end

  def authenticated!
    unless logged_in?
      
    end
  end

  def current_user
    current_user ||= User.find_by(id: session[:user_id])
  end
end