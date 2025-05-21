let playerWins = 0, computerWins = 0, draws = 0;
let board, currentPlayer, player, computer, gameActive;

// Winning combinations
const winCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

const boardDiv = document.getElementById('board');
const messageDiv = document.getElementById('message');
const playerWinsSpan = document.getElementById('playerWins');
const computerWinsSpan = document.getElementById('computerWins');
const drawsSpan = document.getElementById('draws');
const playerMarkSpan = document.getElementById('playerMark');
const computerMarkSpan = document.getElementById('computerMark');

function renderBoard() {
  boardDiv.innerHTML = '';
  board.forEach((cell, idx) => {
    const cellDiv = document.createElement('div');
    cellDiv.className = 'cell';
    cellDiv.textContent = cell;
    cellDiv.onclick = () => handleCellClick(idx);
    boardDiv.appendChild(cellDiv);
  });
}

function handleCellClick(idx) {
  if (!gameActive || board[idx] || currentPlayer !== player) return;
  makeMove(idx, player);
  if (checkEnd(player)) return;
  currentPlayer = computer;
  setTimeout(computerMove, 500); // Delay for realism
}

function makeMove(idx, mark) {
  if (!board[idx]) {
    board[idx] = mark;
    renderBoard();
  }
}

function computerMove() {
  if (!gameActive) return;
  const available = board.map((cell, idx) => cell === '' ? idx : null).filter(i => i !== null);
  // Simple AI: random move
  const move = available[Math.floor(Math.random() * available.length)];
  makeMove(move, computer);
  if (checkEnd(computer)) return;
  currentPlayer = player;
  messageDiv.textContent = `Your turn (${player})`;
}

function checkEnd(mark) {
  if (checkWinner(mark)) {
    gameActive = false;
    if (mark === player) {
      playerWins++; messageDiv.textContent = "You win!";
    } else {
      computerWins++; messageDiv.textContent = "Computer wins!";
    }
    updateScoreboard();
    return true;
  } else if (board.every(cell => cell)) {
    gameActive = false;
    draws++; messageDiv.textContent = "It's a draw!";
    updateScoreboard();
    return true;
  }
  return false;
}

function checkWinner(mark) {
  return winCombos.some(combo => combo.every(idx => board[idx] === mark));
}

function updateScoreboard() {
  playerWinsSpan.textContent = playerWins;
  computerWinsSpan.textContent = computerWins;
  drawsSpan.textContent = draws;
}

function resetGame() {
  board = Array(9).fill('');
  // Randomly assign X and O
  if (Math.random() < 0.5) {
    player = 'X'; computer = 'O';
  } else {
    player = 'O'; computer = 'X';
  }
  playerMarkSpan.textContent = player;
  computerMarkSpan.textContent = computer;
  currentPlayer = 'X'; // X always starts
  gameActive = true;
  renderBoard();
  if (currentPlayer === computer) {
    messageDiv.textContent = `Computer's turn (${computer})`;
    setTimeout(computerMove, 500);
  } else {
    messageDiv.textContent = `Your turn (${player})`;
  }
}

// Initial game setup
resetGame();
