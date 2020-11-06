// customcountdown.js

// Add const to handle HTML Elements on Input View 
const inputContainer = document.getElementById('input-container');
const countdownFrom = document.getElementById('countdownFrom');
const dateEl = document.getElementById('date-picker');

// Add global variables
let countdownTitle = '';
let countdownDate = '';

// Set Date Input Min with current date
const today = new Date().toISOString().split('T')[0];
//console.log(today);

dateEl.setAttribute('min', today);

// Gather Form Input values
function updateCountdown(e) {
    // prevent page from refreshing and clearing input values
    e.preventDefault();

    // capture Form Input values
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;

    //console.log(e);
    console.log(countdownTitle);
    console.log(countdownDate);
}


// Event Listeners
countdownForm.addEventListener('submit', updateCountdown);