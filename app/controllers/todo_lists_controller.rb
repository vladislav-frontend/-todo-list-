class TodoListsController < ApplicationController
	def index
		@categories = Category.all
	end
end