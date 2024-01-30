const display = (function() {
  const domBoard = document.querySelector(".game-board");
  const domTiles = domBoard.querySelectorAll(".game-tile");

  function update() {
    const gameBoard = game.getBoard().flat();

    domTiles.forEach((tile, i) => {
      tile.textContent = gameBoard[i];
    });
  }
    
  return {update};
})();