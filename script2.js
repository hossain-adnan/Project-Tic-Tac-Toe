
function checkWin(board, player, row, column, symbol) {
    if (
        (board[row].every(cell => cell.getValue() === symbol))
        || (board.every(row => row[column].getValue() === symbol))
        || (board[0][0].getValue() === symbol && board[1][1].getValue() === symbol && board[2][2].getValue() === symbol)
        || (board[0][2].getValue() === symbol && board[1][1].getValue() === symbol && board[2][0].getValue() === symbol)
    ) return true;
}

// after win 
    //console Update
    gameBoard.printBoard(); 
    console.log(`${player} has won the game!`);

    //screen Update
    announceDiv.textContent = `${player} has won the game!` // not acc

    board.every(row => row.every(cell => cell.addSymbol(null)));

    

    //Check winner
    // <--horizontal-->
    if (board[row].every(cell => cell.getValue() === symbol)) {
        gameBoard.printBoard();
        console.log(`${player} has won the game!`);
        return;
    }
    // ^Vertical
    if (board.every(row => row[column].getValue() === symbol)) {
        gameBoard.printBoard();
        console.log(`${player} has won the game!`);
        return;
    }
    // Diagonal left to right
    if (row === column){
        if (board[0][0].getValue() === board[1][1].getValue() && board[1][1].getValue() === board[2][2].getValue()){
            gameBoard.printBoard();
            console.log(`${player} has won the game!`);
            return;
        }
    }
    // Diagonal right to left
    if (board[0][2].getValue() === symbol
        && board[1][1].getValue() === symbol
        && board[2][0].getValue() === symbol) {
        gameBoard.printBoard();
        console.log(`${player} has won the game!`);
        return;
    }