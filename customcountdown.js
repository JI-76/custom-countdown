// customcountdown.js

// Add const to handle HTML Elements on Input View 
const inputContainer = document.getElementById('input-container');
const countdownFrom = document.getElementById('countdownFrom');
const dateEl = document.getElementById('date-picker');

// Set Date Input Min with current date
const today = new Date().toISOString().split('T')[0];
//console.log(today);

dateEl.setAttribute('min', today);
