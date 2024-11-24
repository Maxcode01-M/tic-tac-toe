// Game state
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
const statusElement = document.getElementById('status');
const resetButton = document.getElementById('resetBtn');
const cells = document.querySelectorAll('.cell');

// Winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle click on a cell
function handleCellClick(index) {
    if (board[index] !== '' || !gameActive) {
        return; // Ignore if the cell is already occupied or the game is not active
    }

    // Update the board
    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;

    // Check for a winner
    if (checkWinner()) {
        statusElement.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
    } else if (board.every(cell => cell !== '')) {
        // Check for a draw (board is full)
        statusElement.textContent = 'It\'s a draw!';
        gameActive = false;
    } else {
        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusElement.textContent = `Player ${currentPlayer}'s Turn (${currentPlayer})`;
    }
}

// Check for winner
function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] === board[b] && board[b] === board[c] && board[a] !== '';
    });
}

// Reset game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    statusElement.textContent = `Player 1's Turn (X)`;
    cells.forEach(cell => cell.textContent = '');
}

// Event listeners
cells.forEach(cell => {
    cell.addEventListener('click', (event) => {
        const index = event.target.dataset.index;
        handleCellClick(index);
    });
});

resetButton.addEventListener('click', resetGame);
