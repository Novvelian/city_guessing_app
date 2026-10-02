// The correct city for the player to guess
const targetCity = "Boston";

// The list of hints for this city
const hints = [
  "This city is located on the East Coast of the United States.",
  "It is famous for the Freedom Trail and rich American history.",
  "It is known for its famous baked beans and Fenway Park."
];

// Track which hint we are currently showing (starts at 0 for the first hint)
let currentHintIndex = 0;