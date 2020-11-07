// customcountdown.js

// Add const to handle HTML elements on Input UI View
const inputContainer = document.getElementById('input-container');
const countdownFrom = document.getElementById('countdownFrom');
const dateEl = document.getElementById('date-picker');

// Add const to handle HTML elements on Countdown UI View
const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
// returns an array of HTML elements (Days, Hours, Minutes, Seconds)
const timeElements = document.querySelectorAll('span');

// Add global variables
let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;

// Time unit constants
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input Min with current date
const today = new Date().toISOString().split('T')[0];
//console.log(today);

dateEl.setAttribute('min', today);

// Populate Countdown UI \ Completed Countdown UI
function updateDOM() {
    // returns milliseconds since Unix Epoch (1/1/1970)
    const now = new Date().getTime();
    // calculate the difference between the Event date in the future and current date
    const distance = countdownValue - now;
    console.log('distance', distance);

    // Calculate days remaining
    // returns largest whole number
    const days = Math.floor(distance / day);
    // Calculate hours remaining
    // returns remainder
    const hours = Math.floor((distance % day) / hour);
    // Calculate minutes remaining
    // returns remainder
    const minutes = Math.floor((distance % hour) / minute);
    // Calculate seconds remaining
    // returns remainder
    const seconds = Math.floor((distance % minute) / second);
    console.log(days, hours, minutes, seconds);

    // Populate Countdown UI View HTML elements
    countdownElTitle.textContent = `${countdownTitle}`;
    timeElements[0].textContent = `${days}`;
    timeElements[1].textContent = `${hours}`;
    timeElements[2].textContent = `${minutes}`;
    timeElements[3].textContent = `${seconds}`;

    // Hide Input UI View
    inputContainer.hidden = true;

    // Show Countdown UI View
    countdownEl.hidden = false;
};

// Gather  Input UI View Form Input values
function updateCountdown(e) {
    // prevent page from refreshing and clearing input values
    e.preventDefault();

    // capture Form Input values
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;

    //console.log(e);
    console.log(countdownTitle);
    console.log(countdownDate);

    // Get number version of current Date
    countdownValue = new Date(countdownDate).getTime();
    console.log('countdown value', countdownValue);

    // update webpage DOM
    updateDOM();
};


// Event Listeners
countdownForm.addEventListener('submit', updateCountdown);