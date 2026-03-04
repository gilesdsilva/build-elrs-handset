const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetBtn = document.getElementById('reset');
let currentPlayer = 'X';
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleCellClick(e) {
    const clickedCell = e.target;
    const index = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    clickedCell.innerText = currentPlayer;
    
    checkResult();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerText = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (!board.includes("")) {
        statusDisplay.innerText = "Draw!";
        gameActive = false;
    }
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', () => {
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.innerText = "");
    gameActive = true;
    currentPlayer = 'X';
    statusDisplay.innerText = "";
});
