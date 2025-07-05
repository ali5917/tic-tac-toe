const gameBoard = (()=> {
    // Initializing Board
    let board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    let cellsMarked = 0;

    // Board Functions
    const getBoard = () => board;
    const getCellsMarked = () => cellsMarked;

    function printBoard () {
        console.log(`${board[0]} | ${board[1]} | ${board[2]}`);
        console.log(`${board[3]} | ${board[4]} | ${board[5]}`);
        console.log(`${board[6]} | ${board[7]} | ${board[8]}`);
    }

    function markBoard (sign, index) {
        if (board[index] == " ") {
            board[index] = sign;
            cellsMarked ++;
            return true;
        }
        else return false;
    }

    function resetBoard () {
        board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
        cellsMarked = 0;
    }

    return {getBoard, resetBoard, markBoard, printBoard, getCellsMarked};
})();

// Player Factory Function
const Player = (name, sign) => {
    return {name, sign};
}

const gameController = (() => {
    let board = gameBoard.getBoard();

    let player1 = Player("", "X");
    let player2 = Player("", "O");
    const setPlayers = (p1,p2) => {
        player1.name = p1;
        player2.name = p2;
    }
    let currentPlayer = player1;

    const getCurrentPlayer = () => currentPlayer;

    const winCombos = [[0,1,2], [3,4,5], [6,7,8],[0,3,6], [1,4,7], [2,5,8],[0,4,8], [2,4,6]];

    const isWin = () => {
        let thisSign = currentPlayer.sign;
        for (let combo of winCombos) {
            let [a, b, c] = combo;
            if (board[a] == thisSign && board[b] == thisSign && board[c] == thisSign) {
                winningPlayer = currentPlayer;
                return true;
            }
        }
        return false;        
    };

    const isTie = () => {
        if (!isWin() && gameBoard.getCellsMarked() == 9) return true;
        return false;
    }

    const togglePlayer = () => {
        if (currentPlayer == player1) return player2;
        else return player1;
    }

    const playRound = (index) => {
        if (gameBoard.markBoard(currentPlayer.sign, index)) {            
            console.log(`${currentPlayer.name}'s turn!`);
            gameBoard.printBoard();
            
            if (isWin()) {
                console.log(`${currentPlayer.name} beats ${togglePlayer().name}`);
                return;
            }
            if (isTie()) {
                console.log(`${currentPlayer.name} tied ${togglePlayer().name}`)
                return;
            }
            currentPlayer = togglePlayer();
        }     
    }

    const restart = () => {
        gameBoard.resetBoard();
    }

    return {playRound, restart, setPlayers, isWin, isTie, getCurrentPlayer}
})();

// Handling Form Submission
const handleFormInput = (e) => {
    e.preventDefault();
    let p1 = document.getElementById("player1").value.trim();
    let p2 = document.getElementById("player2").value.trim();

    if (!p1 || !p2) return;

    gameController.setPlayers(p1,p2);
    document.querySelector(".form").style.display = "none";
    document.querySelector(".game-div").style.display = "flex";
    renderBoard();
    updateBoard();
}
document.getElementById("name-form").addEventListener("submit", handleFormInput);

// Rendering Board
const boardContainer = document.querySelector(".board-div");
function renderBoard () {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleCellClick);
        boardContainer.appendChild(cell);
    }
}

// Handle Cell Clicks
function handleCellClick(e) {
    if (gameController.isWin() || gameController.isTie()) return;
    const cell = e.target;
    const index = cell.dataset.index;
    gameController.playRound(index);
    updateBoard();
}

// Update Board
function updateBoard () {
    let board = gameBoard.getBoard();
    const cells = document.querySelectorAll(".cell");
    let header = document.querySelector(".game-div div h1");
    
    cells.forEach((cell,index) => {
        cell.textContent = board[index];
        if (cell.textContent == "X") {
            cell.style.backgroundColor = "#003c37";
            cell.style.color = "white";
        } else if (cell.textContent == "O") {
            cell.style.backgroundColor = "white";
            cell.style.color = "#003c37";
        } else {
            cell.style.backgroundColor = "aquamarine";
        }
    });

    const boardDiv = document.querySelector(".board-div");
    if (gameController.isWin()){
        let winner = gameController.getCurrentPlayer().name;
        header.textContent = `${winner} Wins! 🎉`;
        boardDiv.style.gap = "0px";
        cells.forEach(cell => {
            cell.style.borderRadius = "0px";
        })
    } else if (gameController.isTie()) {
        header.textContent = `Math Tied! 😀`;
        boardDiv.style.gap = "0px";
        cells.forEach(cell => {
            cell.style.borderRadius = "0px";
        })
    } else {
        header.textContent = `${gameController.getCurrentPlayer().name}'s turn`;
    }

    cells.forEach((cell, index) => {
        cell.addEventListener("mouseover", () => {
            if (cell.textContent == " ") {
                cell.textContent = gameController.getCurrentPlayer().sign;
            }
        })
        cell.addEventListener("mouseleave", () => {
            cell.textContent = board[index];
        })
    })
}