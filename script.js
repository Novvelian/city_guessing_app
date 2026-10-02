

// Game State Variables
let currentCityData = null;
let currentHintIndex = 0;
let wrongGuessCount = 0;
let previousDistance = null;

// Select elements from the DOM
const hintsList = document.getElementById("hints-list");
const guessesList = document.getElementById("guesses-list");
const guessButton = document.getElementById("guess-button");
const cityInput = document.getElementById("city-input");
const guessControls = document.getElementById("guess-controls");
const resetButton = document.getElementById("reset-button");

// Helper function: Calculate distance in miles using the Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 3958.8; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// Helper function: Get a color along a gradient from Red (0 miles) to Blue (12,400 miles max distance)
function getDistanceColor(distance) {
  const maxDistance = 12400; // Half Earth's circumference (max distance)
  let ratio = Math.min(distance / maxDistance, 1); // 0 = closest (red), 1 = furthest (blue)
  
  // Interpolate RGB values between Red (255, 0, 0) and Blue (0, 100, 255)
  const red = Math.round(255 * (1 - ratio));
  const green = 0;
  const blue = Math.round(255 * ratio);
  
  return `rgb(${red}, ${green}, ${blue})`;
}

// Function to start or reset the game
function startNewGame() {
  hintsList.innerHTML = "";
  guessesList.innerHTML = "";
  cityInput.value = "";
  currentHintIndex = 0;
  wrongGuessCount = 0;
  previousDistance = null;

  guessControls.classList.remove("hidden");
  resetButton.classList.add("hidden");

  const randomIndex = Math.floor(Math.random() * citiesData.length);
  currentCityData = citiesData[randomIndex];

  displayCurrentHint();
}

// Function to display the current hint
function displayCurrentHint() {
  if (currentCityData && currentHintIndex < currentCityData.hints.length) {
    const newHint = document.createElement("li");
    newHint.textContent = currentCityData.hints[currentHintIndex];
    hintsList.appendChild(newHint);
  }
}

// Function to reveal all remaining hints when the user wins
function revealAllHints() {
  while (currentHintIndex < currentCityData.hints.length - 1) {
    currentHintIndex++;
    displayCurrentHint();
  }
}

// Function to end the game round
function showGameOver() {
  guessControls.classList.add("hidden");
  resetButton.classList.remove("hidden");
}

// Function to handle guess submission
guessButton.addEventListener("click", function() {
  const userGuess = cityInput.value.trim().toLowerCase();

  if (userGuess === "") {
    return;
  }

  // Find coordinates by matching primary city name OR any alias from knownCities (loaded via possible_cities.js)
  const guessedCityData = knownCities.find(c => 
    c.city.toLowerCase() === userGuess || 
    (c.aliases && c.aliases.includes(userGuess))
  );

  // Check if the current secret target city matches the user's guess (either by main name OR by alias)
  const isCorrect = currentCityData && (
    userGuess === currentCityData.city.toLowerCase() ||
    (
      guessedCityData && 
      guessedCityData.city.toLowerCase() === currentCityData.city.toLowerCase()
    )
  );

  let feedback = "";
  let itemColor = "black"; // Default color if city isn't in knownCities

  if (guessedCityData) {
    const currentDistance = calculateDistance(
      guessedCityData.lat,
      guessedCityData.lon,
      currentCityData.lat,
      currentCityData.lon
    );

    // Set item text color based on distance gradient
    itemColor = getDistanceColor(currentDistance);

    if (isCorrect) {
      feedback = " — Correct!";
    } else if (previousDistance === null) {
      // First guess: Show miles ONLY
      feedback = ` (${currentDistance} miles away)`;
    } else {
      // Subsequent guesses: Show Hotter/Colder/Same distance ONLY
      if (currentDistance < previousDistance) {
        feedback = " (Hotter!)";
      } else if (currentDistance === previousDistance) {
        feedback = " (Same distance!)";
      } else {
        feedback = " (Colder!)";
      }
    }
    previousDistance = currentDistance;
  }

  // Create list item and apply text content + color
  const newGuessItem = document.createElement("li");
  newGuessItem.textContent = cityInput.value.trim() + feedback;
  newGuessItem.style.color = itemColor;
  newGuessItem.style.fontWeight = "bold"; // Make text bold so colors stand out
  guessesList.appendChild(newGuessItem);

  // Check if guess is correct
  if (isCorrect) {
    revealAllHints();
    alert("Congrats, you got it right!");
    showGameOver();
  } else {
    wrongGuessCount++;
    if (wrongGuessCount >= 5) {
      alert(`Game Over! The correct city was ${currentCityData.city}.`);
      showGameOver();
    } else {
      currentHintIndex++;
      displayCurrentHint();
    }
  }

  cityInput.value = "";
});

// Allow pressing the "Enter" key to submit a guess
cityInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    guessButton.click();
  }
});

// Reset button listener
resetButton.addEventListener("click", startNewGame);

// Start game on page load
startNewGame();