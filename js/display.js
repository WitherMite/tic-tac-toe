const display = (function() {
  const domBoard = document.querySelector(".game-board");
  const domTiles = domBoard.querySelectorAll(".game-tile");

  function startPlay() {
    domTiles.forEach((tile) => {
      tile.addEventListener("click", playerClick);
    })
  }
  startPlay();
  
  function playerClick() {
    const turn = game.getTurn();
    const [row , col] = [
      Number(this.dataset.row),
      Number(this.dataset.col)
    ];

    const result = game.markTile(turn, [row, col]);
    console.log(result);
    if (result) stopPlay();
  }

  function update() {
    const gameBoard = game.getBoard().flat();

    domTiles.forEach((tile, i) => {
      tile.textContent = gameBoard[i];
    });
  }

  function stopPlay() {
    domTiles.forEach((tile) => tile.removeEventListener("click", playerClick));
  }

  return {startPlay, update, stopPlay};
})();