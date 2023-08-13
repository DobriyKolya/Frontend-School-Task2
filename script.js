const cells = document.querySelectorAll('.cell');
const playerTurn = document.querySelector('.player-turn');
const resetButton = document.querySelector('.reset-button');
const startButton = document.querySelector('#startButton');
const player1NameInput = document.querySelector('#player1Name');
const player2NameInput = document.querySelector('#player2Name');

let currentPlayer = 'X';
let gameActive = false;
let player1Name = '';
let player2Name = '';

const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const checkWinner = () => {
    for (const combo of winCombos) {
        const [a, b, c] = combo;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            gameActive = false;
            playerTurn.textContent = `Игрок ${currentPlayer === 'X' ? player1Name : player2Name} победил!`;
            cells[a].classList.add('win');
            cells[b].classList.add('win');
            cells[c].classList.add('win');
        }
    }
};

const checkDraw = () => {
    if (gameActive==true && [...cells].every(cell => cell.textContent !== '')) {
        gameActive = false;
        playerTurn.textContent = "Ничья!";
    }
};

const handleClick = (event) => {
    const cell = event.target;
    const index = parseInt(cell.dataset.index);

    if (!gameActive || cell.textContent !== '') return;

    cell.textContent = currentPlayer;
    checkWinner();
    checkDraw();

    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerTurn.textContent = `Ход игрока ${currentPlayer === 'X' ? player1Name : player2Name}`;
    }
};

const resetGame = () => {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('win');
    });
    currentPlayer = 'X';
    gameActive = false;
    playerTurn.textContent = 'Крестики-Нолики';
    startButton.disabled = false;

};

startButton.addEventListener('click', () => {
    player1Name = player1NameInput.value || 'X';
    player2Name = player2NameInput.value || 'O';
    playerTurn.textContent = `Ход игрока ${player1Name}`;
    gameActive = true;
    startButton.disabled = true;
});

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
