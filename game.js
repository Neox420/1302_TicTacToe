const board = document.getElementById('game-board');
const cells = board.getElementsByTagName('td');
let currentPlayer = 'X';

board.addEventListener('click', (event) => {

    const cell = event.target;
    if (cell.innerHTML === '') {
        cell.innerHTML = currentPlayer;
        if (checkForWin()) {
            alert(`Spieler ${currentPlayer} gewinnt!`);
            resetGame();
        } else if (checkForDraw()) {
            alert('Unentschieden!');
            resetGame();
        } else {
            switchPlayer();
            if (getGameMode() === 'single-player') {
                handleAIMove();
            }
        }
    }
});

function resetGame() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = '';
    }
    currentPlayer = 'X';
}

function switchPlayer() {
    if (currentPlayer === 'X') {
        currentPlayer = 'O';
    } else {
        currentPlayer = 'X';
    }
}

function getGameMode() {
    const gameModeMenu = document.getElementById('game-mode-menu');
    const gameModes = gameModeMenu.getElementsByTagName('input');
    for (let i = 0; i < gameModes.length; i++) {
        if (gameModes[i].checked) {
            return gameModes[i].id;
        }
    }
}

function checkForWin() {

    const wincombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < wincombinations.length; i++) {
        if (cells[wincombinations[i][0]].innerHTML === currentPlayer &&
            cells[wincombinations[i][1]].innerHTML === currentPlayer &&
            cells[wincombinations[i][2]].innerHTML === currentPlayer) {
            return true;
        }
    }
    return false;
}

function checkForDraw() {

    for (let i = 0; i < cells.length; i++) {
        if (cells[i].innerHTML === '') {
            return false;
        }
    }
    return true;
}

function getDifficultyLevel() {
    const difficultyMenu = document.getElementById('difficulty-menu');
    const difficultyLevels = difficultyMenu.getElementsByTagName('input');
    for (let i = 0; i < difficultyLevels.length; i++) {
        if (difficultyLevels[i].checked) {
            return difficultyLevels[i].id;
        }
    }
}


function handleAIMove() {
    const difficultyLevel = getDifficultyLevel();

    let emptyCells = [];
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].innerHTML === '') {
            emptyCells.push(cells[i]);
        }
    }
    let move;

    if (difficultyLevel === 'easy') {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        move = emptyCells[randomIndex];
    }
    if (difficultyLevel === 'hard') {
        if (checkForWinningMove('O')) {
            move = checkForWinningMove('O');
        } else if (checkForWinningMove('X')) {
            move = checkForWinningMove('X');
        } else {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            move = emptyCells[randomIndex];
        }
    }


    move.innerHTML = currentPlayer;



    if (checkForWin()) {
        alert(`Spieler ${currentPlayer} gewinnt!`);
        resetGame();
    } else if (checkForDraw()) {
        alert('Unentschieden!');
        resetGame();
    } else {

        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    }
}

function checkForWinningMove(player) {
    const wincombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < wincombinations.length; i++) {
        let count = 0;
        let emptyCellIndex;
        for (let j = 0; j < wincombinations[i].length; j++) {
            if (cells[wincombinations[i][j]].innerHTML === player) {
                count++;
            } else if (cells[wincombinations[i][j]].innerHTML === '') {
                emptyCellIndex = wincombinations[i][j];
            }
        }
        if (count === 2 && typeof emptyCellIndex !== 'undefined') {
            return cells[emptyCellIndex];
        }
    }
    return false;
}