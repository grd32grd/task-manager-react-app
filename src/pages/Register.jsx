import React from "react";

const Register = () => {
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
				<h1>REGISTER</h1>	
				<label>Username:</label>
				<input id="username" type="text"/>
				<label> Password:</label>
				<input id="password" type="password"/>
				<button id="register" type="button" onClick={register}>Register</button>
			</div>
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

function register() {
	const newUserRequest = {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ 
			username: document.getElementById('username').value,
			password: document.getElementById('password').value 
		})
	};
	fetch('http://localhost:3001/register', newUserRequest) 
	.then(response => alert(response.json()));
}

export default Register;