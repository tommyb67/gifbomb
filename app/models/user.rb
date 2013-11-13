class User < ActiveRecord::Base

  validates_uniqueness_of :email, presence: true
  has_secure_password
  has_and_belongs_to_many :gifs

############FAVES##########
  def favorite(url)
    unless self.gifs.include?(url)
      self.gifs << url
    end
  end
  def unfavorite(url)
    self.gifs.destroy(url)
  end
end