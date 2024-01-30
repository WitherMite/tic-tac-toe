const game = (function() {

  const turn = (function() {
    let p1Turn = true;
    let p2Turn = false;

    function get() {
      if (p1Turn) return "X"; // player1.mark;
      if (p2Turn) return "O"; // player2.mark;
    }

    function change() {
      [p1Turn, p2Turn] = [p2Turn, p1Turn];
    }

    function reset() {
      [p1Turn, p2Turn] = [true, false];
    }

    return {get, change, reset};
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
    updateDiagonals() {
      board.diagonals = [
        [board.rows[0][0], board.rows[1][1], board.rows[2][2]],
        [board.rows[0][2], board.rows[1][1], board.rows[2][0]]
      ];
    }
  };

  function getTurn() {
    return turn.get();
  }

  function getBoard() {
    return board.rows;
  }

  function markTile(marker, pos) {
    const [row, col] = pos;
    const notEmpty = board.rows[row][col] !== null;
    const outOfBounds = 0 > row || row > 3 || 0 > col || col > 3;
    if (notEmpty || outOfBounds) return;

    board.rows[row][col] = marker;
    board.columns[col][row] = marker;
    board.updateDiagonals();
    display.update();

    turn.change();
    return checkEnd();
  }

  function checkEnd() {
    const allLines = [...board.rows, ...board.columns, ...board.diagonals];

    const pWon = allLines.some((line) => {
      const isWin = line[0] === line[1] && line[1] === line[2];
      const notNull = line.every((tile) => tile !== null);
      if (isWin && notNull) return true;
    });
    if (pWon) return "Win";

    const gameTie = allLines.every((line) => {
      return line.every((tile) => tile !== null);
    });
    if (gameTie) return "Tie";
  }

  function reset() {
    const allLines = [...board.rows, ...board.columns, ...board.diagonals];
    allLines.forEach((line) => line.splice(0, 3, null, null, null));
    display.update();
    turn.reset();
    display.startPlay();
  }
  return {markTile, reset, getBoard, getTurn};
})();