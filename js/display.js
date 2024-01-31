const display = (function() {
  const domTiles = document.querySelectorAll(".game-tile");
  const playerBtns = document.querySelectorAll("form > button");
  const startBtn = document.querySelector(".start-btn");
  const resultDisplay = document.querySelector(".game-results");
  const p1Form = document.querySelector(`#p1-form`);
  const p2Form = document.querySelector(`#p2-form`);

  startBtn.addEventListener("click", game.reset);
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
    resultDisplay.textContent = "Tic-Tac-Toe";
    domTiles.forEach((tile) => tile.addEventListener("click", playerClick));
  }
  
  function playerClick() {
    const [row , col] = [
      Number(this.dataset.row),
      Number(this.dataset.col)
    ];

    const result = game.markTile(row, col);
    console.log(result);
    if (result) stopPlay(result);
  }

  function stopPlay(msg) {
    resultDisplay.textContent = msg;
    domTiles.forEach((tile) => tile.removeEventListener("click", playerClick));
  }

  function update() {
    const gameBoard = game.getBoard().flat();

    domTiles.forEach((tile, i) => {
      tile.textContent = gameBoard[i];
    });
  }

  function changeHighlight(p1turn) {
    if (p1turn) {
      p1Form.classList.add("highlight");
      p2Form.classList.remove("highlight");
      return;
    }
    p1Form.classList.remove("highlight");
    p2Form.classList.add("highlight");
  }

  return {startPlay, update, changeHighlight};
})();