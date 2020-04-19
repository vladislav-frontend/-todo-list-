class TasksController < ApplicationController

	before_action :authenticate_user!
	before_action :set_task, only: [:show, :edit, :update, :destroy]

	def create
		project = current_user.projects.find(params[:project_id])
		@task = project.tasks.new(task_params)

		if @task.save
			render json: @task
		end
	end

	def update
		if @task.update_attributes(task_params)
			render json: @task
		end
	end

	def destroy
		@task.destroy
		render json: :ok
	end

	private

	def set_task
		@task = current_user.tasks.find(params[:id])
	end

	def task_params
		params.permit(:title, :project_id, :checked, :datetime, :deadline, :position)
	end
end