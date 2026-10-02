// The correct city for the player to guess
const targetCity = "Boston";

// The list of hints for this city
const hints = [
  "This city is located on the East Coast of the United States.",
  "It is famous for the Freedom Trail and rich American history.",
  "It is known for its famous baked beans and Fenway Park."
];

// Track which hint we are currently showing
let currentHintIndex = 0;

// Select elements from the DOM
const hintsList = document.getElementById("hints-list");
const guessButton = document.getElementById("guess-button");
const cityInput = document.getElementById("city-input");
const guessesList = document.getElementById("guesses-list");

// Function to display the current hint on the screen
function displayCurrentHint() {
  if (currentHintIndex < hints.length) {
    const newHint = document.createElement("li");
    newHint.textContent = hints[currentHintIndex];
    hintsList.appendChild(newHint);
  }
}

// Show the first hint when the app loads
displayCurrentHint();

// Function to handle when the user clicks the Guess button
guessButton.addEventListener("click", function() {
  const userGuess = cityInput.value.trim();

  // If the user didn't type anything, do nothing
  if (userGuess === "") {
    return;
  }

  // Create a new list item and add the guess to the Past Guesses list
  const newGuessItem = document.createElement("li");
  newGuessItem.textContent = userGuess;
  guessesList.appendChild(newGuessItem);

  // Check if the guess is correct (ignoring capital/lowercase differences)
  if (userGuess.toLowerCase() === targetCity.toLowerCase()) {
    alert("Congrats, you got it right!");
  } else {
    // If wrong, move to the next hint and display it
    currentHintIndex++;
    displayCurrentHint();
  }

  // Clear the input box for the next guess
  cityInput.value = "";
});