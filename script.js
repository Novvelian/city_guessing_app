// A list of city objects, each containing a city name and its array of hints
const citiesData = [
  {
    city: "Boston",
    hints: [
      "This city is located on the East Coast of the United States.",
      "It is famous for the Freedom Trail and rich American history.",
      "It is known for its famous baked beans and Fenway Park.",
      "IT'S BSOTON MY GUY",
      "i give up"
    ]
  },
  {
    city: "Tokyo",
    hints: [
      "This city is the capital of Japan.",
      "It is famous for the bustling Shibuya Crossing.",
      "It features the iconic Tokyo Tower and delicious ramen.",
      "test",
      "123 123"
    ]
  },
  {
    city: "Paris",
    hints: [
      "This city is known as the City of Light.",
      "It is home to the famous Eiffel Tower.",
      "It is situated along the River Seine in France.",
      "Yaabaadaabadoo",
      "mmm le french"
    ]
  }
];

// Game State Variables
let currentCityData = null;
let currentHintIndex = 0;

// Select elements from the DOM
const hintsList = document.getElementById("hints-list");
const guessesList = document.getElementById("guesses-list");
const guessButton = document.getElementById("guess-button");
const cityInput = document.getElementById("city-input");

// Function to start or reset the game with a random city
function startNewGame() {
  // Clear lists and inputs on the screen
  hintsList.innerHTML = "";
  guessesList.innerHTML = "";
  cityInput.value = "";
  currentHintIndex = 0;

  // Pick a random city from citiesData
  const randomIndex = Math.floor(Math.random() * citiesData.length);
  currentCityData = citiesData[randomIndex];

  // Display the first hint of the new city
  displayCurrentHint();
}

// Function to display the current hint on the screen
function displayCurrentHint() {
  if (currentCityData && currentHintIndex < currentCityData.hints.length) {
    const newHint = document.createElement("li");
    newHint.textContent = currentCityData.hints[currentHintIndex];
    hintsList.appendChild(newHint);
  }
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

  // Check if guess matches current target city
  if (userGuess.toLowerCase() === currentCityData.city.toLowerCase()) {
    alert("Congrats, you got it right!");
  } else {
    currentHintIndex++;
    displayCurrentHint();
  }

  cityInput.value = "";
});

// Start the first game when the page loads
startNewGame();