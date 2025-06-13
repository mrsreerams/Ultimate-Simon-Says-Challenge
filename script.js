const colors = ['red', 'green', 'blue', 'yellow'];
let sequence = [];
let userInput = [];
let isUserTurn = false;
let isGameOver = false;

const messageElement = document.getElementById('message');
const startButton = document.getElementById('start-btn');

function generateRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function addColorToSequence() {
  const newColor = generateRandomColor();
  sequence.push(newColor);
  isUserTurn = false;
  messageElement.textContent = "Watch the sequence!";
  playSequence();
}

function playSequence() {
  let index = 0;
  const interval = setInterval(() => {
    flashColor(sequence[index]);
    index++;

    if (index >= sequence.length) {
      clearInterval(interval);
      setTimeout(() => {
        messageElement.textContent = "Your turn!";
        isUserTurn = true;
      }, 500);
    }
  }, 1000);
}

function flashColor(color) {
  const colorButton = document.getElementById(color);
  colorButton.classList.add('active');
  setTimeout(() => {
    colorButton.classList.remove('active');
  }, 500);
}

function handleUserInput(color) {
  if (isGameOver) return;

  userInput.push(color);

  if (userInput[userInput.length - 1] !== sequence[userInput.length - 1]) {
    messageElement.textContent = "Game Over! You clicked the wrong color.";
    isGameOver = true;
    return;
  }

  if (userInput.length === sequence.length) {
    setTimeout(() => {
      userInput = [];
      addColorToSequence();
    }, 1000);
  }
}

function startNewGame() {
  sequence = [];
  userInput = [];
  isGameOver = false;
  messageElement.textContent = "Watch the sequence!";
  addColorToSequence();
}

// Add event listeners to buttons
colors.forEach(color => {
  const colorButton = document.getElementById(color);
  colorButton.addEventListener('click', () => {
    if (isUserTurn) {
      handleUserInput(color);
    }
  });
});
