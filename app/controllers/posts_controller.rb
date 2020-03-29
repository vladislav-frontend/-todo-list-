class PostsController < ApplicationController

	before_action :set_post, only: [:show, :edit, :update, :destroy]

	def index
		@posts = Post.all
	end

	def show
	end

	def new
		@post = Post.new
	end

	def create
		@post = Post.new(post_params)

		if @post.save
			redirect_to @post, success: 'Пост успешно добавлен'
		else
			render :new, danger: 'Пост не добавлен'
		end
	end

	def edit
	end

	def update
		if @post.update_attributes(post_params)
			redirect_to @post, success: 'Пост успешно обновлен'
		else
			render :edit, danger: 'Пост не обновлен'
		end
	end

	def destroy
		@post.destroy
		redirect_to posts_path, success: 'Пост успешно удален'
	end

	private

	def set_post
		@post = Post.find(params[:id])
	end

	def post_params
		params.require(:post).permit(:title, :summary, :body, :all_tags, :category_id)
	end
end