
	function addTaskTemplate(id, title, project_id, position) {
		var taskTemplate = `
			<div id="task-${id}" data-position="${position}" class="task">
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
		$("#project-" + project_id + " .project-body").append(taskTemplate);
	}

	$(document).on("click", ".addTaskButton", function(event) {
		var projectID = $(event.target).parents(".project")[0].id;
		var addTaskInput = $("#" + projectID + " .addTaskInput");
		var addTaskName = addTaskInput.val();
		var tasksBox = $("#" + projectID + " .task");

		if (tasksBox.length) {
			var lastTask = tasksBox.last();
			var lastTaskPosition = lastTask.attr('data-position');

			if (addTaskName.length > 2 && addTaskName.length < 21) {
				$.ajax({
					type: "POST",
					url: "/tasks",
					data: {
						project_id: projectID.replace(/\D+/, ''),
						position: parseInt(lastTaskPosition) + 1,
						title: addTaskName
					},
			        success: function(data) {
						addTaskInput.val("");
						addTaskTemplate(data.id, data.title, data.project_id, data.position);
					}
				});
			} else {
				alert("Task name is not correct");
			}
		} else {
			if (addTaskName.length > 2 && addTaskName.length < 21) {
				$.ajax({
					type: "POST",
					url: "/tasks",
					data: {
						project_id: projectID.replace(/\D+/, ''),
						position: 1,
						title: addTaskName
					},
			        success: function(data) {
						addTaskInput.val("");
						addTaskTemplate(data.id, data.title, data.project_id, data.position);
					}
				});
			} else {
				alert("Task name is not correct");
			}
		}

	});

	$(document).on("click", ".editTask", function(event) {
		var projectID = $(event.target).parents(".project")[0].id;
		var taskID = $(event.target).parents(".task")[0].id;
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

			if (editTaskName.length > 2 && editTaskName.length < 21) {
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
			} else {
				alert("Task name is not correct");
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
		var taskID = $(event.target).parents(".task")[0].id;
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
		var taskID = $(event.target).parents(".task")[0].id;
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
		var taskID = $(event.target).parents(".task")[0].id;
		if ($("#" + taskID + " .task-date").hasClass("task-date-show")) {
			$("#" + taskID + " .task-date").removeClass("task-date-show");
		} else {
			$("#" + taskID + " .task-date").addClass("task-date-show");
		}
	});

	$(document).on("change", ".task-date", function(event) {
		var taskID = $(event.target).parents(".task")[0].id;
		var taskDateInput = $("#" + taskID + " .task-date");
		var taskDate = new Date(taskDateInput.val());

		$.ajax({
			type: "PUT",
			url: "/tasks/" + taskID.replace(/\D+/, ''),
			data: {
				deadline: taskDate
			},
	        success: function(data) {
				taskDateInput.removeClass("task-date-show");
	        }
		});
	});

	$(document).on("click", ".upTask", function(event) {
		var taskID = $(event.target).parents(".task")[0].id;
		var taskBox = $("#" + taskID);
		var prevTaskBox = taskBox.prev();

		if (prevTaskBox.length) {
			var prevTaskID = prevTaskBox[0].id.replace(/\D+/, '');
			var prevTaskPosition = prevTaskBox.attr('data-position');
			prevTaskBox.before(taskBox);

			$.ajax({
				type: "PUT",
				url: "/tasks/" + taskID.replace(/\D+/, ''),
				data: {
					position: parseInt(prevTaskPosition)
				},
		        success: function(data) {
		        	taskBox.attr('data-position', data.position);
		        }
			});

			$.ajax({
				type: "PUT",
				url: "/tasks/" + prevTaskID.replace(/\D+/, ''),
				data: {
					position: parseInt(prevTaskPosition) + 1
				},
		        success: function(data) {
		        	prevTaskBox.attr('data-position', data.position);
		        }
			});
		} else {
			alert("It isn't possible to increase the position of task");
		}
	});

	$(document).on("click", ".downTask", function(event) {
		var taskID = $(event.target).parents(".task")[0].id;
		var taskBox = $("#" + taskID);
		var nextTaskBox = taskBox.next();

		if (nextTaskBox.length) {
			var nextTaskID = nextTaskBox[0].id.replace(/\D+/, '');
			var nextTaskPosition = nextTaskBox.attr('data-position');
			nextTaskBox.after(taskBox);

			$.ajax({
				type: "PUT",
				url: "/tasks/" + taskID.replace(/\D+/, ''),
				data: {
					position: parseInt(nextTaskPosition)
				},
		        success: function(data) {
		        	taskBox.attr('data-position', data.position);
		        }
			});

			$.ajax({
				type: "PUT",
				url: "/tasks/" + nextTaskID.replace(/\D+/, ''),
				data: {
					position: parseInt(nextTaskPosition) - 1
				},
		        success: function(data) {
		        	nextTaskBox.attr('data-position', data.position);
		        }
			});
		} else {
			alert("It isn't possible to lower the position of task");
		}
	});
