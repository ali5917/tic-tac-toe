const GameBoard = (()=> {
    // Initializing Board
    let board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

    // Board Functions
    const getBoard = () => board;

    function printBoard () {
        console.log(`${board[0]} | ${board[1]} | ${board[2]}`);
        console.log(`${board[3]} | ${board[4]} | ${board[5]}`);
        console.log(`${board[6]} | ${board[7]} | ${board[8]}`);
    }

    function markBoard (sign, index) {
        if (board[index] == " ") board[index] = sign;
        else console.error("Invalid move! That spot is already taken.");
    }

    function resetBoard () {
        board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    }

    // printBoard();
    // markBoard("X",2);
    // markBoard("O",8);
    // markBoard("X",1);
    // markBoard("X",4);
    // markBoard("O",3);
    // markBoard("X",6);
    // printBoard();

    return {getBoard, resetBoard, markBoard, printBoard};
})();

