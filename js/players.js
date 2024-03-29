const players = (() => {

  function makePlayer(marker, name) {
    let playerMark = marker;
    let playerName = name;
    
    const getName = () => playerName;
    const setName = (str) => playerName = str;
    const getMarker = () => playerMark;
    const setMarker = (str) => {
      if (str.toString().length !== 1) return;
      playerMark = str.toString();
      game.reset();
    }

    return {getName, setName, getMarker, setMarker};
  }

  const [p1, p2] = [makePlayer("X", "Player 1"), makePlayer("O", "Player 2")];

  function setPlayerName(id, str) {
    if (id === "p1") return p1.setName(str);
    if (id === "p2") return p2.setName(str);
  }

  function getPlayerName(id) {
    if (id === "p1") return p1.getName();
    if (id === "p2") return p2.getName();
  }

  function setPlayerMark(id, str) {
    const [mark1, mark2] = [p1.getMarker(), p2.getMarker()];
    if (id === "p1" && str !== mark2) {
      return p1.setMarker(str);
    }
    if (id === "p2" && str !== mark1) {
      return p2.setMarker(str);
    } alert("Players can not use the same marker.");
  }

  function getPlayerMark(id) {
    if (id === "p1") return p1.getMarker();
    if (id === "p2") return p2.getMarker();
  }

  return {setPlayerName, setPlayerMark, getPlayerName, getPlayerMark}
})();