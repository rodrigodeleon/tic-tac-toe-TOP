const Player = (name, id) => {
  const game = [];
  function regPlayedCell(cellId) {
    game.push(cellId);
  }
  return { name, id, regPlayedCell };
};

const gameBoard = (function () {
  let gameboard = [];
  const newGameBoard = () => {
    for (let index = 1; index < 10; index++) {
      gameboard.push({
        id: index,
        available: true,
        playedBy: "",
      });
    }
    return gameboard;
  };

  const getGameBoard = () => {
    return gameboard;
  };
  return {
    //public methods
    newGameBoard,
    getGameBoard,
  };
})();

const Game = (function () {
  const newGame = () => {
    const PlayerX = Player(prompt("Choose Player X Name"), "X");
    const PlayerO = Player(prompt("Choose Player O Name"), "O");
    const players = [];
    players.push(PlayerX, PlayerO);
    const activePlayer = PlayerX;
    const gameEnd = false;
    console.table(players);
    const gameboard = gameBoard.newGameBoard();
    displayController.showGameBoard(gameboard);
    while (!gameEnd)
    {
        newPlay()
    }
  };
  function newPlay(cellId) {

  }

  return { newGame };
})();

const displayController = (function () {
  const gameBoardDisplay = document.querySelector("#display");
  const showGameBoard = function (gameboard) {
    gameboard.forEach((element) => {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("id", element.id);
      element.available
        ? (cell.style.backgroundColor = "light-blue")
        : (cell.innerHTML = element.playedBy);
      gameBoardDisplay.appendChild(cell);
    });
  };

  return { showGameBoard };
})();

Game.newGame();
