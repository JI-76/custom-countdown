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

// Add const to handle HTML elements on Completed Countdown UI View
const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

// Add global variables
let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let savedCountdown;

// Add Time unit constants
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input Min with current date
const today = new Date().toISOString().split('T')[0];
//console.log(today);
// Make the date chosen the miniumum date to avoid backdated events
dateEl.setAttribute('min', today);

// Populate Countdown UI \ Completed Countdown UI
function updateDOM() {
    // use Javascript Timing Event to fire the code 
    countdownActive = setInterval(() => {

        // returns milliseconds since Unix Epoch (1/1/1970)
        const now = new Date().getTime();
        // calculate the difference between the Event date in the future and current date
        const distance = countdownValue - now;
        // console.log('distance', distance);

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

        // console.log(days, hours, minutes, seconds);

        // Hide Input UI View
        inputContainer.hidden = true;

        // If countdown has ended; show the Completed Countdown UI View
        if (distance < 0) {
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden = false;
        } else {
            // Else show the countdown in progress aka the Countdown UI View
            // Populate Countdown UI View HTML elements
            countdownElTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;

            // switch UI Views
            completeEl.hidden = true;
            countdownEl.hidden = false
        };
    }, second);    
};

// Gather Input UI View Form Input values
function updateCountdown(e) {
    // prevent page from refreshing and clearing input values
    e.preventDefault();

    // capture Form Input values
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    // countdown title and date object
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,
    };
    // console.log(savedCountdown);

    // persist countdown title and date object
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));

    //console.log(e);
    // console.log(countdownTitle);
    // console.log(countdownDate);

    // Check for valid date
    if (countdownDate === '') {
        // inform user
        alert('Please select a date for the countdown');
    } else {
        // Get number version of current Date
        countdownValue = new Date(countdownDate).getTime();
        // console.log('countdown value', countdownValue);

        // update webpage DOM
        updateDOM();
    };
};

// Reset All Values
function reset() {
    // Hide Countdown UI View
    countdownEl.hidden = true;
    completeEl.hidden = true;
    // Show Input UI View
    inputContainer.hidden = false;
    // Stop the countdown using Javascript Timing Event
    clearInterval(countdownActive);
    // Reset values for Countdown UI View
    countdownTitle = '';
    countdownDate  = '';
    
    // clear out saved countdown
    localStorage.removeItem('countdown');
};

// Retrieve Countdown data from local storage if it exists
function restorePreviousCountdown() {
    if (localStorage.getItem('countdown')) {
        // hide Input UI View
        inputContainer.hidden = true;
        // retrieve saved Countdown data from local storage
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        // assign retrieved data values to the global variables
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;

        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    };
};

// Event Listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeEl.addEventListener('click', reset);

// On Load, check local storage
restorePreviousCountdown();