const game = (function() {
    const board = {
        rows: [
            [null, null, null], 
            [null, null, null], 
            [null, null, null]
        ],
        columns: [
            [null, null, null], 
            [null, null, null], 
            [null, null, null]
        ],
        diagonals: [
            [null, null, null], 
            [null, null, null]
        ],
    };
    board.allLines = [board.rows, board.columns, board.diagonals];

    function markTile(marker, pos) {
        const row = pos[0];
        const col = pos[1];

        if (0 <= row < 3 && 0 <= col < 3) {
            (board.rows[row])[col] = marker;
            (board.columns[col])[row] = marker;
            // updateDiagonals();
        }
        // checkWin();
    }

    function clearBoard() {
        board.allLines.forEach((direction) => {
            direction.forEach((line) => {
                line = [null, null, null];
            });
        });
        
    }

    return { markTile, clearBoard, board };
})();

game.markTile("X", [1,1]);

console.table(game.board);

// game.clearBoard();

// console.table(game.board);