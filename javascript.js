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
  const gameboard = gameBoard.newGameBoard();
  const PlayerX = Player(prompt("Choose Player X Name"), "X");
  const PlayerO = Player(prompt("Choose Player O Name"), "O");
  let activePlayer = PlayerX;
  let gameEnd = false;
  console.table(players);
  const newGame = () => {
    displayController.showGameBoard(gameboard);
    // while (!gameEnd) {

    // }
    // alert('game finished!');
  };
  function newPlay(cellChosen) {
    const myobj = gameboard.find((element) => element.id == cellChosen);
    myobj.available = false;
    myobj.playedBy = activePlayer;
    console.log(myobj);
    activePlayer == PlayerX
      ? (activePlayer = PlayerO)
      : (activePlayer = PlayerX);
    displayController.showGameBoard(gameboard);
  }

  return { newGame, newPlay };
})();

const displayController = (function () {
  const gameBoardDisplay = document.querySelector("#display");
  const showGameBoard = function (gameboard) {
    gameBoardDisplay.innerHTML = "";
    gameboard.forEach((element) => {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("id", element.id);
      element.available
        ? (cell.style.backgroundColor = "light-blue")
        : (cell.innerHTML = element.playedBy.name);
      gameBoardDisplay.appendChild(cell);

      cell.addEventListener("click", () => Game.newPlay(cell.id));
    });
  };

  return { showGameBoard };
})();

Game.newGame();
