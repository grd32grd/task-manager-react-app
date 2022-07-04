import React from "react";

const Tasks = () => {
	return (
		<div>
			<p id='open' onClick={openMenu}>Menu</p>
			<div id='menu'>
				<a id='close' onClick={closeMenu}>X</a>
				<br></br>
				<br></br>
				<a href="/">HOME</a>
				<br></br>
				<br></br>
				<a href="/glossary">GLOSSARY</a>
				<br></br>
				<br></br>
				<a href="/tasks">TASKS</a>
				<br></br>
				<br></br>
				<a href="/register">REGISTER</a>
			</div>
			
			<div id='main'>
				<h1>TASKS</h1>
				<label htmlFor="task-search">Search for Tasks:</label>
				<input id="tasksearch" type="text" name="task-search" />
				<button id="tasksearchbutton" type="button" onClick={searchTasks}>Search</button>
				<div id="tasksdiv">

				</div>
			</div>
			<script>

			</script>
		</div>
	);
};

function openMenu() {
	document.getElementById("menu").style.width = '10%';
	document.getElementById("main").style.width = '90%';
}

function closeMenu() {
	document.getElementById("menu").style.width = '0%';
	document.getElementById("main").style.width= '100%';
}

function searchTasks() {
	let tasksQuery = document.getElementById('tasksearch').value
	let link;
	if (tasksQuery == ""){
		link = "http://localhost:3001/tasks";
	} else {
		link = 'http://localhost:3001/tasks/' + tasksQuery
	}
    fetch(link, { method: 'GET' }) .then(data => data.json()) .then(json => {
			let tasks = json['data'];
			let tasksdiv = document.getElementById('tasksdiv');
			tasksdiv.innerHTML = "";

			for (var i = 0; i < tasks.length; i++){
				let name = document.createElement('p')
				name.innerHTML = JSON.stringify(tasks[i].name)
				document.getElementById('tasksdiv').append(name)

				let username = document.createElement('p')
				username.innerHTML = JSON.stringify("Assigned to: " + tasks[i].username)
				document.getElementById('tasksdiv').append(username)

				let datetime = document.createElement('p')
				datetime.innerHTML = JSON.stringify("Due: " + tasks[i].datetimeformat)
				document.getElementById('tasksdiv').append(datetime)

				let br = document.createElement('br')
				document.getElementById('tasksdiv').append(br)
				
			}
	})
}
export default Tasks;
