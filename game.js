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
        updateDiagonals: function() {

        }
    };
    const allLines = [board.rows, board.columns, board.diagonals];

    function markTile(marker, pos) {
        const row = pos[0];
        const col = pos[1];

        if (0 <= row < 3 && 0 <= col < 3) {
            (board.rows[row])[col] = marker;
            (board.columns[col])[row] = marker;
            // board.updateDiagonals();
        }
        console.log(game.board);
        // checkWin();
    }

    function clearBoard() {
        allLines.forEach((direction) => {
            direction.forEach((line) => {
                line.splice(0, 3, null, null, null);
            });
        });
        console.log(game.board);
    }

    return { markTile, clearBoard, board };
})();


