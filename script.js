
document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset');
    const messageElement = document.getElementById('message');
    let currentPlayer = 'X';
    let board = Array(9).fill(null);
    let gameActive = true;

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

    const checkWin = () => {
        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                gameActive = false;
                messageElement.textContent = `${currentPlayer} wins!`;
                return true;
            }
        }
        return false;
    };

    const checkDraw = () => {
        return board.every(cell => cell !== null);
    };

    const handleClick = (e) => {
        const index = e.target.getAttribute('data-index');
        if (board[index] || !gameActive) return;
        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        if (checkWin()) {
            cells.forEach(cell => cell.removeEventListener('click', handleClick));
        } else if (checkDraw()) {
            messageElement.textContent = `It's a draw!`;
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            messageElement.textContent = `Player ${currentPlayer}'s turn`;
        }
    };

    const resetGame = () => {
        board.fill(null);
        cells.forEach(cell => {
            cell.textContent = '';
            cell.addEventListener('click', handleClick);
        });
        currentPlayer = 'X';
        gameActive = true;
        messageElement.textContent = `Player ${currentPlayer}'s turn`;
    };

    cells.forEach(cell => cell.addEventListener('click', handleClick));
    resetButton.addEventListener('click', resetGame);

    // Initialize message
    messageElement.textContent = `Player ${currentPlayer}'s turn`;
});
