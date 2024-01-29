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
            board.diagonals = [
                [board.rows[0][0], board.rows[1][1], board.rows[2][2]],
                [board.rows[0][2], board.rows[1][1], board.rows[2][0]]
            ];
        }
    };

    function getBoard() {
        return board.rows;
    }

    function markTile(marker, pos) {
        const row = pos[0];
        const col = pos[1];

        if (0 <= row < 3 && 0 <= col < 3) {
            board.rows[row][col] = marker;
            board.columns[col][row] = marker;
            board.updateDiagonals();
        }
        console.log(board);
        return checkWin();
    }

    function checkWin() {
        const allLines = [board.rows, board.columns, board.diagonals];

        return allLines.some((direction) => {
            return direction.some((line) => {

                const isWin = line[0] === line[1] && line[1] === line[2];
                const notNull = line.every((tile) => tile !== null);

                if (isWin && notNull) return true;
            });
        });
    }

    function clearBoard() {
        const allLines = [board.rows, board.columns, board.diagonals];

        allLines.forEach((direction) => {
            direction.forEach((line) => {

                line.splice(0, 3, null, null, null);
            });
        });
    }

    return {markTile, clearBoard, getBoard};
})();


