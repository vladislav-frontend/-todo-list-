class User < ApplicationRecord
  has_many :projects, dependent: :destroy
  has_many :tasks, through: :projects
  
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
