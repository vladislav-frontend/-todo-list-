class ProjectsController < ApplicationController

	before_action :set_project, only: [:show, :edit, :update, :destroy]

	def create
		@project = current_user.projects.new(project_params)

		if @project.save
			render json: @project
		else
			render json: @project.errors, status: 422
		end
	end

	def update
		if @project.update(project_params)
			render json: @project
		else
			render json: @project.errors, status: 422
		end
	end

	def destroy
		@project.destroy
		render json: :ok
	end

	private

	def set_project
		@project = current_user.projects.find(params[:id])
	end

	def project_params
		params.permit(:name)
	end

end