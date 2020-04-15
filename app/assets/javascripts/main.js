$(document).ready(function() {

	// PROJECTS SCRIPTS

	function addProjectTemplate(id, name) {
		var projectTemplate = `
			<div id="project-${id}" class="project">
				<div class="project-title">
					<div>
						<i class="fas fa-tasks"></i>
						<div class="d-flex">
							<input type="text" class="editProjectInput">
							<button class="btn btn-sm editProjectButton"><i class="fas fa-check"></i></button>
							<button class="btn btn-sm closeProjectButton"><i class="fas fa-times"></i></button>
						</div>
						<span class="projectName">${name}</span>
					</div>
					<div>
				        <button class="btn btn-sm editProject"><i class="fas fa-pencil-alt"></i></button>
				        <button class="btn btn-sm deleteProject"><i class="far fa-trash-alt"></i></button>
					</div>
				</div>

				<div class="project-add">
					<i class="fas fa-plus"></i>
					<input type="text" class="addTaskInput" placeholder="Start typing here to create a task">
			        <button class="addTaskButton" class="btn">Add Task</button>
				</div>

				<div class="app-items-inner">
				</div>
			</div>
		`;
		$(".project-wrap").append(projectTemplate);
	}

	$("#addProjectButton").click(function() {
		var addProjectName = $("#addProjectInput").val();

		if (addProjectName) {
			$.ajax({
				type: "POST",
				url: "/projects",
				data: {
					name: addProjectName
				},
		        success: function(data) {
					$("#addProjectInput").val("");
					addProjectTemplate(data.id, data.name);
				}
			});
		}
	});

	$(document).on("click", ".editProject", function(event) {
		var projectID = $(event.target).parents(".project")[0].id;
		var editProjectInput = $("#" + projectID + " .editProjectInput");
		var editProjectButton = $("#" + projectID + " .editProjectButton");
		var closeProjectButton = $("#" + projectID + " .closeProjectButton");
		var projectName = $("#" + projectID + " .projectName");
		projectName.css("display", "none");
		editProjectInput.css("display", "block");
		editProjectButton.css("display", "block");
		closeProjectButton.css("display", "block");

		editProjectButton.click(function(event) {
			var editProjectName = editProjectInput.val();

			if (editProjectName) {
				$.ajax({
					type: "PUT",
					url: "/projects/" + projectID.replace(/\D+/, ''),
					data: {
						name: editProjectName
					},
			        success: function(data) {
						projectName.css("display", "block");
						editProjectInput.css("display", "none");
						editProjectButton.css("display", "none");
						closeProjectButton.css("display", "none");
						projectName.text(data.name);
			        }
				});
			}
		});

		closeProjectButton.click(function() {
			projectName.css("display", "block");
			editProjectInput.css("display", "none");
			editProjectButton.css("display", "none");
			closeProjectButton.css("display", "none");
		});
	});

	$(document).on("click", ".deleteProject", function(event) {
		var projectID = $(event.target).parents(".project")[0].id;
		var projectBox = $("#" + projectID);

		$.ajax({
			type: "DELETE",
			url: "/projects/" + projectID.replace(/\D+/, ''),
	        success: function(data) {
				projectBox.remove();
	        }
		});
	});


	// TASKS SCRIPTS

	function addTaskTemplate(id, title, project_id) {
		var taskTemplate = `
			<div id="task-${id}" class="project-body">
				<div>
					<input type="checkbox" class="taskCheckbox">
					<div class="d-flex">
						<input type="text" class="editTaskInput">
						<button class="btn btn-sm editTaskButton"><i class="fas fa-check"></i></button>
						<button class="btn btn-sm closeTaskButton"><i class="fas fa-times"></i></button>
					</div>
					<span class="taskName">${title}</span>
				</div>
				<input type="date" class="task-date">
				<div>
			        <button class="btn btn-sm dateTask"><i class="far fa-clock"></i></button>
			        <button class="btn btn-sm upTask"><i class="fas fa-caret-up"></i></button>
			        <button class="btn btn-sm downTask"><i class="fas fa-caret-down"></i></button>
			        <button class="btn btn-sm editTask"><i class="fas fa-pencil-alt"></i></button>
			        <button class="btn btn-sm deleteTask"><i class="far fa-trash-alt"></i></button>
				</div>
			</div>
		`;
		$("#project-" + project_id + " .app-items-inner").append(taskTemplate);
	}

	$(document).on("click", ".addTaskButton", function(event) {
		var projectID = $(event.target).parents(".project")[0].id;
		var addTaskInput = $("#" + projectID + " .addTaskInput");
		var addTaskName = addTaskInput.val();

		if (addTaskName) {
			$.ajax({
				type: "POST",
				url: "/tasks",
				data: {
					project_id: projectID.replace(/\D+/, ''),
					title: addTaskName
				},
		        success: function(data) {
					addTaskInput.val("");
					addTaskTemplate(data.id, data.title, data.project_id);
				}
			});
		}
	});

	$(document).on("click", ".editTask", function(event) {
		var projectID = $(event.target).parents(".project")[0].id;
		var taskID = $(event.target).parents(".project-body")[0].id;
		var editTaskInput = $("#" + taskID + " .editTaskInput");
		var editTaskButton = $("#" + taskID + " .editTaskButton");
		var closeTaskButton = $("#" + taskID + " .closeTaskButton");
		var taskName = $("#" + taskID + " .taskName");
		taskName.css("display", "none");
		editTaskInput.css("display", "block");
		editTaskButton.css("display", "block");
		closeTaskButton.css("display", "block");

		editTaskButton.click(function(event) {
			var editTaskName = editTaskInput.val();

			if (editTaskName) {
				$.ajax({
					type: "PUT",
					url: "/tasks/" + taskID.replace(/\D+/, ''),
					data: {
						title: editTaskName
					},
			        success: function(data) {
						taskName.css("display", "block");
						editTaskInput.css("display", "none");
						editTaskButton.css("display", "none");
						closeTaskButton.css("display", "none");
						taskName.text(data.title);
			        }
				});
			}
		});

		closeTaskButton.click(function() {
			taskName.css("display", "block");
			editTaskInput.css("display", "none");
			editTaskButton.css("display", "none");
			closeTaskButton.css("display", "none");
		});
	});

	$(document).on("click", ".deleteTask", function(event) {
		var projectID = $(event.target).parents(".project")[0].id;
		var taskID = $(event.target).parents(".project-body")[0].id;
		var taskBox = $("#" + taskID);

		$.ajax({
			type: "DELETE",
			url: "/tasks/" + taskID.replace(/\D+/, ''),
	        success: function(data) {
				taskBox.remove();
	        }
		});
	});

	$(document).on("change", ".taskCheckbox", function(event) {
		var taskID = $(event.target).parents(".project-body")[0].id;
		var taskNameChecked = $("#" + taskID + " .taskName");

		if ($(event.target)[0].checked) {
			$.ajax({
				type: "PUT",
				url: "/tasks/" + taskID.replace(/\D+/, ''),
				data: {
					checked: true
				},
		        success: function(data) {
					taskNameChecked.addClass("task-name-checked");
		        }
			});
		} else {
			$.ajax({
				type: "PUT",
				url: "/tasks/" + taskID.replace(/\D+/, ''),
				data: {
					checked: false
				},
		        success: function(data) {
					taskNameChecked.removeClass("task-name-checked");
		        }
			});
		}
	});

	$(document).on("click", ".dateTask", function(event) {
		var taskID = $(event.target).parents(".project-body")[0].id;
		if ($("#" + taskID + " .task-date").hasClass("task-date-show")) {
			$("#" + taskID + " .task-date").removeClass("task-date-show");
		} else {
			$("#" + taskID + " .task-date").addClass("task-date-show");
		}
	});

	$(document).on("change", ".task-date", function(event) {
		var taskID = $(event.target).parents(".project-body")[0].id;
		var taskDateInput = $("#" + taskID + " .task-date");
		var taskDate = new Date(taskDateInput.val());

		$.ajax({
			type: "PUT",
			url: "/tasks/" + taskID.replace(/\D+/, ''),
			data: {
				deadline: taskDate
			},
	        success: function(data) {
				console.log(data.deadline);
				taskDateInput.removeClass("task-date-show");
	        }
		});
	});

	$(document).on("click", ".upTask", function(event) {
		var taskID = $(event.target).parents(".project-body")[0].id;
		console.log(taskID);
		// var taskDateInput = $("#" + taskID + " .task-date");

		// $.ajax({
		// 	type: "PUT",
		// 	url: "/tasks/" + taskID.replace(/\D+/, ''),
		// 	data: {
		// 		deadline: taskDate
		// 	},
	 //        success: function(data) {
		// 		console.log(data.deadline);
		// 		taskDateInput.removeClass("task-date-show");
	 //        }
		// });
	});
});