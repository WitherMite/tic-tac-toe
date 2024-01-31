const display = (function() {
  const domTiles = document.querySelectorAll(".game-tile");
  const playerBtns = document.querySelectorAll("form > button");
  const startBtn = document.querySelector(".start-btn");

  startBtn.addEventListener("click", game.set);
  playerBtns.forEach(btn => btn.addEventListener("click", sendPlayerInfo));

  function sendPlayerInfo(e) {
    e.preventDefault();
    const player = this.dataset.player;
    const form = document.querySelector(`#${player}-form`);
    const name = document.querySelector(`#${player}-name`).value;
    const marker = document.querySelector(`#${player}-marker`).value;

    console.table([name, marker]);
    form.reset();

    if (name) {
      const nameDisplay = document.querySelector(`.${player}-display-name`);
      nameDisplay.textContent = name + ":";
      players.setPlayerName(player, name);
    } 
    if (marker) players.setPlayerMark(player, marker);
  }

  function startPlay() {
    domTiles.forEach((tile) => tile.addEventListener("click", playerClick));
  }
  
  function playerClick() {
    const [row , col] = [
      Number(this.dataset.row),
      Number(this.dataset.col)
    ];

    const result = game.markTile(row, col);
    console.log(result);
    if (result) stopPlay();
  }

  function stopPlay() {
    domTiles.forEach((tile) => tile.removeEventListener("click", playerClick));
  }

  function update() {
    const gameBoard = game.getBoard().flat();

    domTiles.forEach((tile, i) => {
      tile.textContent = gameBoard[i];
    });
  }

  return {startPlay, update};
})();