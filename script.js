
const gameBoard = (function(){

    //Make the board
    const rows = 3;
    const columns = 3;
    let board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell()); // Defined later     
        }
    }

    //Get the board
    const getBoard = () => board;

    // Draw on the board
    const drawSymbol = (row, column, player) => {
        board[row][column].addSymbol(player); //addSymbol is a method of Cell()
    }

    //Print Board on the console
    const printBoard = () => {
        const boardWithValues = board.map(row => row.map(cell => cell.getValue())) //getValue is a method of Cell()
        console.log(boardWithValues);
    }

    return { getBoard, drawSymbol, printBoard };
})();

function Cell() {
    let value = null;

    const addSymbol = (player) => {
        value = player;
    }

    const getValue = () => value;

    return {
        addSymbol,
        getValue
    };
}

const game = (function (playerOne,playerTwo) {

    // gameBoard.printBoard(); // Supposed to console log

    const players = [
        {name: playerOne, symbol: 'X'},
        {name: playerTwo, symbol: 'O'}
    ];

    // Select active player
    let activePlayer = players[0];

    // function to switch player
    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0]
    }

    const getActivePlayer = () => activePlayer;

    //Print New Round
    const printNewRound = () => {
        gameBoard.printBoard();
        console.log(`${getActivePlayer().name}'s Turn:`)
    }

    printNewRound();

    //Play round
    const playRound = (row, column) => {

        const board = gameBoard.getBoard();
        const symbol = getActivePlayer().symbol;
        const player = getActivePlayer().name;

        if (board[row][column].getValue() === null) {
            console.log(`${player} has drawn ${symbol}`)
            gameBoard.drawSymbol(row, column, symbol);
        } else {
            console.log('Choose an empty cell');
            return;
        }

        // Check winner
        if (board[row].every(cell => cell.getValue() === symbol)) {
            console.log(`${player} has won the game!`);
            return;
        }

        switchPlayer();
        printNewRound();
    }

    return {playRound}
    
})("X-man","O-man");
