class Gif < ActiveRecord::Base

  validates :url, presence: true
  has_and_belongs_to_many :users

end