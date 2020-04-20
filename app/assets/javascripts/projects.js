
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

				<div class="project-body">
				</div>
			</div>
		`;
		$(".project-wrap").append(projectTemplate);
	}

	$("#addProjectButton").click(function() {
		var addProjectName = $("#addProjectInput").val();

		if (addProjectName.length > 2 && addProjectName.length < 21) {
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
		} else {
			alert("Project name is not correct");
			return false;
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

			if (editProjectName.length > 2 && editProjectName.length < 21) {
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
			} else {
				alert("Project name is not correct");
			return false;
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
