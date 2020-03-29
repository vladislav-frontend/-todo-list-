class CategoriesController < ApplicationController

	before_action :set_category, only: [:show, :edit, :update, :destroy]

	def index
		@categories = Category.all
	end

	def show
	end

	def new
		@category = Category.new
	end

	def create
		@category = Category.new(category_params)

		if @category.save
			redirect_to categories_path, success: 'Категория успешно создана'
		else
			render :new, danger: 'Категория не создана'
		end
	end

	def edit
	end

	def update
		if @category.update_attributes(category_params)
			redirect_to categories_path, success: 'Категория успешно обновлена'
		else
			render :edit, danger: 'Категория не обновлена'
		end
	end

	def destroy
		@category.destroy
		redirect_to categories_path, success: 'Категория успешно удалена'
	end

	private

	def set_category
		@category = Category.find(params[:id])
	end

	def category_params
		params.require(:category).permit(:name)
	end

end