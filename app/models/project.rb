class Project < ApplicationRecord
	has_many :tasks, dependent: :destroy
	belongs_to :user
	
	validates :name, presence: true, length: { minimum: 3, maximum: 21 }
end
