const game = (function() {

    const turn = (function() {
        let p1Turn = true;
        let p2Turn = false;

        function getTurn(p) {
            if (p = 1) return p1Turn;
            if (p = 2) return p2Turn;
        }

        function switchTurn() {
            [p1Turn, p2Turn] = [p2Turn, p1Turn];
        }

        function reset() {
            [p1Turn, p2Turn] = [true, false];
        }

        return {getTurn, switchTurn, reset};
    })();

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

    function getTurn(p) {
        return turn.getTurn(p);
    }

    function getBoard() {
        return board.rows;
    }

    function markTile(marker, pos) {
        const row = pos[0];
        const col = pos[1];

        if (board.rows[row][col] !== null) return "tile is not empty";
        if (0 >= row > 3 && 0 >= col > 3) return "position out of bounds";
            
        board.rows[row][col] = marker;
        board.columns[col][row] = marker;
        board.updateDiagonals();
        
        turn.switchTurn();
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

    function reset() {
        const allLines = [board.rows, board.columns, board.diagonals];
        turn.reset();

        allLines.forEach((direction) => {
            direction.forEach((line) => {

                line.splice(0, 3, null, null, null);
            });
        });
    }
    return {markTile, reset, getBoard, getTurn};
})();