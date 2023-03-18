const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

const winCases = [
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

function initialization() {
  cells.forEach((cell) => cell.addEventListener("click", cellClick));
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
}

initialization();

function cellClick() {
  let cellIndex = this.getAttribute("cellIndex");

  if (options[cellIndex] != "" || !running) {
    return;
  }
  updateCell(this, cellIndex);
  checkWinner();
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.style.backgroundColor = currentPlayer === "X" ? "#f8ff54" : "#ff7c7c";
}

function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
  for (let i = 0; i < winCases.length; i++) {
    const [a, b, c] = winCases[i];
    if (options[a] !== "" && options[a] === options[b] && options[a] === options[c]) {
      // Game over, we have a winner
      running = false;
      statusText.textContent = `${currentPlayer} wins!  👇 `;
      cells[a].style.backgroundColor = cells[b].style.backgroundColor = cells[c].style.backgroundColor = "#49b249";
      return;
    }
  }

  // If all options are filled, and no one has won, it's a tie
  if (!options.includes("")) {
    running = false;
    statusText.textContent = "It's a tie! 👇";
    return;
  }

  // No winner yet, continue playing
  changePlayer();
}

function restartGame() {
  options = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  running = true;
  statusText.textContent = `${currentPlayer}'s turn`;
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.backgroundColor = "white";
  });
}
