class Project < ApplicationRecord
	has_many :tasks
	belongs_to :user
	
	validates :name, presence: true, length: { minimum: 3, maximum: 21 }
end
