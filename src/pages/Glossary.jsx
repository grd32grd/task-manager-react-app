import React from "react";

const Glossary = () => {
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
				<h1>GLOSSARY</h1>
				<label htmlFor="glossary-search">Search for Glossary Entry:</label>
				<input id="glossarysearch" type="text" name="glossary-search" />
				<button id="glossarysearchbutton" type="button" onClick={searchGlossary}>Search</button>
				<div id="glossarydiv">
		
				</div>
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

function searchGlossary() {
	let glossaryQuery = document.getElementById('glossarysearch').value
	let link;
	if (glossaryQuery == ""){
		link = "http://localhost:3001/glossary";
	} else {
		link = 'http://localhost:3001/glossary/' + glossaryQuery
	}
    fetch(link, { method: 'GET' })
        .then(data => data.json())
        .then(json => {
			let glossary = json['data'];
			let glossarydiv = document.getElementById('glossarydiv');
			glossarydiv.innerHTML = "";

			for (var i = 0; i < glossary.length; i++){
				let name = document.createElement('p')
				name.innerHTML = JSON.stringify(glossary[i].name)
				document.getElementById('glossarydiv').append(name)

				let acronym = document.createElement('p')
				acronym.innerHTML = JSON.stringify(glossary[i].acronym)
				document.getElementById('glossarydiv').append(acronym)

				let definition = document.createElement('p')
				definition.innerHTML = JSON.stringify(glossary[i].definition)
				document.getElementById('glossarydiv').append(definition)

				let br = document.createElement('br')
				document.getElementById('glossarydiv').append(br)
				
			}
		})
}

export default Glossary;

