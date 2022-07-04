import React from "react";
import { Link } from "react-router-dom";

function Home() {
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
        <h1>HOME</h1>
        <p>Welcome to the DSP Task Management System!</p>
      </div>
    </div>
  );
}

function openMenu() {
	document.getElementById("menu").style.width = '10%';
	document.getElementById("main").style.width = '90%';
}

function closeMenu() {
	document.getElementById("menu").style.width = '0%';
	document.getElementById("main").style.width= '100%';
}

export default Home;

