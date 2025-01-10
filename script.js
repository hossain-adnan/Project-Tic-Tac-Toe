
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

        if(checkWin(board, row, column, symbol)) {
            gameBoard.printBoard(); 
            console.log(`${player} has won the game!`);
        }

        switchPlayer();
        printNewRound();

        //Check draw
    }

    return {
        playRound,
        getActivePlayer,
    }
    
})("X-man","O-man");

function screenController() {
    const announceDiv = document.querySelector('.announcement');
    const boardDiv = document.querySelector('.board');

    const updateScreen = () => {
        boardDiv.textContent = '';

        const board = gameBoard.getBoard();
        const activePlayer = game.getActivePlayer();

        announceDiv.textContent = `${activePlayer.name}'s turn...`

        board.forEach((row,rowIndex) => {
            row.forEach((cell, cellIndex) => {
                const cellButton = document.createElement('button');
                cellButton.classList.add('cell');
                cellButton.dataset.row = rowIndex;
                cellButton.dataset.column = cellIndex;
                cellButton.textContent = cell.getValue();
                boardDiv.appendChild(cellButton);
            })
        })
    }

    function boardClickHandler(e) {
        const row = e.target.dataset.row;
        const column = e.target.dataset.column;

        if(!row || !column) return;
        game.playRound(row, column);
        updateScreen();
    }

    boardDiv.addEventListener('click', boardClickHandler);

    updateScreen();
}

function checkWin(board, row, column, symbol) {
    if (
        (board[row].every(cell => cell.getValue() === symbol))
        || (board.every(row => row[column].getValue() === symbol))
        || (board[0][0].getValue() === symbol && board[1][1].getValue() === symbol && board[2][2].getValue() === symbol)
        || (board[0][2].getValue() === symbol && board[1][1].getValue() === symbol && board[2][0].getValue() === symbol)
    ) return true;
}

screenController();


