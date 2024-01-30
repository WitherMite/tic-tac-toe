const game = (function() {

  const turn = {
    p1: true,
    p2: false,
    get() {
      if (turn.p1) return "X"; // player1;
      return "O"; // player2;
    },
    change() {
      [turn.p1, turn.p2] = [turn.p2, turn.p1];
    },
    reset() {
      [turn.p1, turn.p2] = [true, false];
    }
  };

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

  function getBoard() {
    return board.rows;
  }

  function markTile(row, col) {
    const notEmpty = board.rows[row][col] !== null;
    const outOfBounds = row < 0 || 3 < row || col < 0 || 3 < col;
    if (notEmpty || outOfBounds) return;

    // const player = turn.get();
    const marker = turn.get(); // player.marker
    board.rows[row][col] = marker;
    board.columns[col][row] = marker;
    board.updateDiagonals();
    display.update();

    turn.change();
    return checkEnd(marker); // (player.name);
  }

  function checkEnd(player) {
    const allLines = [...board.rows, ...board.columns, ...board.diagonals];

    const pWon = allLines.some((line) => {
      const isWin = line[0] === line[1] && line[1] === line[2];
      const notNull = line.every((tile) => tile !== null);
      if (isWin && notNull) return true;
    });
    if (pWon) return `${player} wins`;

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
  return {markTile, reset, getBoard};
})();