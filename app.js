"use strict";

// Initialize the time values, interval ID, and disabled state
let startTime;
let elapsedTime = 0;
let intervalId;
let disabled = false;

// Cache frequently used DOM elements
const timerDisplay = document.querySelector(".timer-display");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapCard = document.querySelector(".lap-card");
const lapTimes = document.getElementById("lap-times");

// Hide the lap card initially
lapCard.style.display = "none";

// Start the timer by incrementing the time values every 10 milliseconds
function startTimer() {
  if (!disabled) {
    disabled = true;
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      displayTimer();
    }, 10);
  }
  startButton.disabled = true
  pauseButton.disabled = false

}

// Pause the timer by clearing the interval
function pauseTimer() {
  clearInterval(intervalId);
  disabled = false;
  startButton.disabled = false
  pauseButton.disabled = true
}

// Reset the timer and clear the lap times
function resetTimer() {
  clearInterval(intervalId);
  elapsedTime = 0;
  displayTimer();
  disabled = false;

  // Clear lap times
  lapTimes.innerHTML = "";
  lapButton.disabled = false;

  // Reset lap number and previous lap time
  lapNumber = 0;
  previousLapTime = 0;

  // Hide lap card
  lapCard.style.display = "none";

  startButton.disabled = false
  pauseButton.disabled = false  
}

let lapNumber = 0;
let previousLapTime = 0;

// Add lap time to the list
function lapTimer() {
  if (disabled) {
    lapNumber++;
    const currentLapTime = elapsedTime;
    const lapTime = currentLapTime - previousLapTime;
    lapTimes.innerHTML += `<div>Lap ${lapNumber}: ${formatTime(
      lapTime
    )} (${getTimeStamp()})</div>`;
    previousLapTime = currentLapTime;

    // Display lap card
    lapCard.style.display = "block";
  }
}

// Get the current timestamp in HH:MM:SS format
function getTimeStamp() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

// Format time in HH:MM:SS format
function formatTime(time) {
  const milliseconds = time % 1000;
  const seconds = Math.floor(time / 1000) % 60;
  const minutes = Math.floor(time / 1000 / 60) % 60;
  const hours = Math.floor(time / 1000 / 60 / 60);
  const formattedMilliseconds = milliseconds.toString().padStart(3, "0");
  if (hours > 0) {
    return `${hours}h ${minutes.toString().padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds.toString().padStart(2, "0")}s`;
  } else {
    return `${seconds}.${formattedMilliseconds}s`;
  }
}

// Update the display with the current time values
function displayTimer() {
  timerDisplay.textContent = formatTime(elapsedTime);
}

// Set up event listeners for the buttons using event delegation
document.addEventListener("click", (event) => {
  if (event.target.matches("#start")) {
    startTimer();
  } else if (event.target.matches("#pause")) {
    pauseTimer();
  } else if (event.target.matches("#reset")) {
    resetTimer();
  } else if (event.target.matches("#lap")) {
    lapTimer();
  }
});




$(function() {
  var timer, minutes, seconds, totalSeconds;
  var handle = $(".ui-slider-handle");

  // Initialize the sliders
  $("#countdown-minutes-slider").slider({
    range: "min",
    value: 0,
    min: 0,
    max: 60,
    slide: function(event, ui) {
      minutes = ui.value;
      totalSeconds = minutes * 60 + seconds;
      updateTimerDisplay();
    }
  });
  
  $("#countdown-seconds-slider").slider({
    range: "min",
    value: 0,
    min: 0,
    max: 59,
    slide: function(event, ui) {
      seconds = ui.value;
      totalSeconds = minutes * 60 + seconds;
      updateTimerDisplay();
    }
  });

  function updateTimerDisplay() {
    $("#countdown-minutes").text(minutes);
    $("#countdown-seconds").text(seconds < 10 ? "0" + seconds : seconds);
  
    // Update the position of the slider handle
    if (seconds < 10) {
      totalSeconds = minutes * 60 + parseInt("0" + seconds);
    } else {
      totalSeconds = minutes * 60 + seconds;
    }
    var percentage = totalSeconds / (minutes * 60 + 59) * 100;
    handle.css("left", percentage + "%");
  }
  
  
  function startTimer() {
    // Get the slider values
    minutes = $("#countdown-minutes-slider").slider("value");
    seconds = $("#countdown-seconds-slider").slider("value");
  
    // Calculate the total number of seconds
    totalSeconds = minutes * 60 + seconds;
  
    // Update the timer display
    updateTimerDisplay();
  
    // Hide the sliders
    $("#countdown-sliders").hide();
  
    // Start the timer
    timer = setInterval(function() {
      totalSeconds--;
  
      if (totalSeconds < 0) {
        clearInterval(timer);
        alert("Time's up!");
      } else {
        minutes = Math.floor(totalSeconds / 60);
        seconds = totalSeconds % 60;
        updateTimerDisplay();
  
        // Animate the slider handle
        handle.addClass("animated");
        setTimeout(function() {
          handle.removeClass("animated");
        }, 1000);
      }
    }, 1000);
  }
  
  function pauseTimer() {
    clearInterval(timer);
  }
  
  function resetTimer() {
    clearInterval(timer);
    totalSeconds = 0;
    minutes = 0; // set minutes to 0
    seconds = 0; // set seconds to 0
    $("#countdown-minutes-slider").slider("value", 0);
    $("#countdown-seconds-slider").slider("value", 0);
    $("#countdown-minutes").text("00");
    $("#countdown-seconds").text("00");
    handle.css("left", "0");
  }
  
  
  $("#start-countdown").click(function() {
    startTimer();
  });
  
  $("#pause-countdown").click(function() {
    pauseTimer();
  });
  
  $("#reset-countdown").click(function() {
    resetTimer();
  });
});



$(document).ready(function(){

  // Stopwatch button click event
  $("#stopwatch-btn").click(function(){
    $(".timer-screen.timer").hide();
    $(".watch-screen.timer").show();
  });

  // Timer button click event
  $("#timer-btn").click(function(){
    $(".timer-screen.timer").show();
    $(".watch-screen.timer").hide();
  });
  
  // Hide the stopwatch and show the timer screen by default
  $(".timer-screen.timer").hide();
  $(".watch-screen.timer").show();

});






// Selectors
const themeToggleBtn = document.getElementById("theme-toggle-btn");  // Selects the theme toggle button
const lightThemeBtn = document.getElementById("light-theme-btn");  // Selects the light theme button
const darkThemeBtn = document.getElementById("dark-theme-btn");    // Selects the dark theme button
const body = document.body;  // Selects the body of the page

// Event listeners
themeToggleBtn.addEventListener("click", toggleTheme);  // Adds click event listener to the theme toggle button
lightThemeBtn.addEventListener("click", setLightTheme);  // Adds click event listener to the light theme button
darkThemeBtn.addEventListener("click", setDarkTheme);    // Adds click event listener to the dark theme button

// Theme functions
function toggleTheme() {
  const isDarkMode = body.classList.contains("dark-mode");  // Checks if body has the class "dark-mode"
  if (isDarkMode) {
    setLightTheme();  // If body has "dark-mode", set light theme
  } else {
    setDarkTheme();   // If body doesn't have "dark-mode", set dark theme
  }
}

function setLightTheme() {
  body.classList.remove("dark-mode");         // Removes "dark-mode" class from body
  body.classList.add("light-mode");           // Adds "light-mode" class to body
  body.style.setProperty('--bg-color', '#d8d7d7');     // Changes background color to light grey
  body.style.setProperty('--text-color', '#1F1F1F');  // Changes text color to dark grey
  body.style.setProperty('--timer-color', '#f3f0f0');  // Changes timer color to light grey
}

function setDarkTheme() {
  body.classList.remove("light-mode");        // Removes "light-mode" class from body
  body.classList.add("dark-mode");            // Adds "dark-mode" class to body
  body.style.setProperty('--bg-color', '#333');          // Changes background color to dark grey
  body.style.setProperty('--text-color', '#fff');        // Changes text color to white
  body.style.setProperty('--timer-color', 'linear-gradient(45deg, #2a2a2a, #3d3d3d, #2a2a2a)');   // Changes timer color to gradient
}



