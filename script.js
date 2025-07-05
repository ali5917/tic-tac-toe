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

    const player1 = Player("Ali", "A");
    const player2 = Player("Ismail", "I");
    let currentPlayer = player1;

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

    return {playRound, restart}
})();