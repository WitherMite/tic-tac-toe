const game = (function() {

  const turn = {
    p1: true,
    check() {
      if (turn.p1) return "p1";
      return "p2";
    },
    change() {
      turn.p1 = !turn.p1;
      display.changeHighlight(turn.p1);
    },
    reset() {
      turn.p1 = true;
      display.changeHighlight(true);
    }
  };

  const board = {
    rows: [ [], [], [] ],
    columns: [ [], [], [] ],
    diagonals: [ [], [] ],
    updateDiagonals() {
      board.diagonals = [
        [board.rows[0][0], board.rows[1][1], board.rows[2][2]],
        [board.rows[0][2], board.rows[1][1], board.rows[2][0]]
      ];
    },
    nullify() {
      const allLines = [...board.rows, ...board.columns, ...board.diagonals];
      allLines.forEach((line) => line.splice(0, 3, null, null, null));
    }
  };
  board.nullify();

  function getBoard() {
    return board.rows;
  }

  function markTile(row, col) {
    const notEmpty = board.rows[row][col] !== null;
    const outOfBounds = row < 0 || 2 < row || col < 0 || 2 < col;
    if (notEmpty || outOfBounds) return;

    const player = turn.check();
    const marker = players.getPlayerMark(player);
    board.rows[row][col] = marker;
    board.columns[col][row] = marker;
    board.updateDiagonals();
    display.update();

    return checkEnd(players.getPlayerName(player));
  }

  function checkEnd(player) {
    const allLines = [...board.rows, ...board.columns, ...board.diagonals];

    const pWon = allLines.some((line) => {
      const isWin = line[0] === line[1] && line[1] === line[2];
      const notNull = line.every((tile) => tile !== null);
      if (isWin && notNull) return true;
    });
    if (pWon) return `${player} Wins!`;

    const gameTie = allLines.every((line) => line.every((tile) => tile !== null));
    if (gameTie) return "Game Tied!";

    turn.change();
  }

  function reset() {
    board.nullify();
    display.update();
    turn.reset();
    display.startPlay();
  }
  return {markTile, reset, getBoard};
})();