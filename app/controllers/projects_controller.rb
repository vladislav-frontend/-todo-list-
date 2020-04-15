class ProjectsController < ApplicationController

	before_action :set_project, only: [:show, :edit, :update, :destroy]

	def create
		@project = current_user.projects.new(project_params)

		if @project.save
			render json: @project
		end
	end

	def update
		if @project.update_attributes(project_params)
			render json: @project
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