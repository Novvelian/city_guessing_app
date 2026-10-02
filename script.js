// A list of city objects, each containing a city name and its array of hints
const citiesData = [
  {
    city: "Boston",
    hints: [
      "This city is located on the East Coast of the United States.",
      "It is famous for the Freedom Trail and rich American history.",
      "It is known for its famous baked beans and Fenway Park.",
      "It is the capital city of Massachusetts.",
      "It is home to Harvard and MIT nearby across the Charles River."
    ]
  },
  {
    city: "Tokyo",
    hints: [
      "This city is the capital of Japan.",
      "It is famous for the bustling Shibuya Crossing.",
      "It features the iconic Tokyo Tower and delicious ramen.",
      "It was formerly known as Edo.",
      "It is the most populous metropolitan area in the world."
    ]
  },
  {
    city: "Paris",
    hints: [
      "This city is known as the City of Light.",
      "It is home to the famous Eiffel Tower.",
      "It is situated along the River Seine in France.",
      "It features the Louvre Museum.",
      "It is world-famous for fashion and croissants."
    ]
  }
];

// Game State Variables
let currentCityData = null;
let currentHintIndex = 0;
let wrongGuessCount = 0;

// Select elements from the DOM
const hintsList = document.getElementById("hints-list");
const guessesList = document.getElementById("guesses-list");
const guessButton = document.getElementById("guess-button");
const cityInput = document.getElementById("city-input");
const guessControls = document.getElementById("guess-controls");
const resetButton = document.getElementById("reset-button");

// Function to start or reset the game
function startNewGame() {
  // Clear lists and reset state
  hintsList.innerHTML = "";
  guessesList.innerHTML = "";
  cityInput.value = "";
  currentHintIndex = 0;
  wrongGuessCount = 0;

  // Show input controls and hide Play Again button
  guessControls.classList.remove("hidden");
  resetButton.classList.add("hidden");

  // Pick a random city
  const randomIndex = Math.floor(Math.random() * citiesData.length);
  currentCityData = citiesData[randomIndex];

  // Display the first hint
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

// Function to end the game round
function showGameOver() {
  guessControls.classList.add("hidden");
  resetButton.classList.remove("hidden");
}

// Function to handle guess submission
guessButton.addEventListener("click", function() {
  const userGuess = cityInput.value.trim();

  if (userGuess === "") {
    return;
  }

  // Add guess to the list
  const newGuessItem = document.createElement("li");
  newGuessItem.textContent = userGuess;
  guessesList.appendChild(newGuessItem);

  // Check if guess is correct
  if (userGuess.toLowerCase() === currentCityData.city.toLowerCase()) {
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

// Reset button listener
resetButton.addEventListener("click", startNewGame);

// Start game on page load
startNewGame();







// Allow pressing the "Enter" key to submit a guess
cityInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    guessButton.click();
  }
});