const Player = (name, nationality) => {
  return { name, nationality };
};

const gameBoard = (function () {
  let gameboard = [];
  const newGameBoard = () => {
    for (let index = 1; index < 10; index++) {
      gameboard.push(index);
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
  const PlayerA = Player("Rodrigo", "Uruguay");
  const PlayerB = Player("Esther", "France");
  const newGame = () => {
    const newGameboard = gameBoard.newGameBoard();
    displayController.showGameBoard(newGameboard);
  };
})();

const displayController = (function () {
  const gameBoardDisplay = document.querySelector("#display");

  const showGameBoard = function (gameboard) {
    gameboard.forEach((element) => {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute('id', element);
      cell.innerHTML = element;
      gameBoardDisplay.appendChild(cell);
    });

    // cell.addEventListener("click", () => {

    // });
  };

  return { showGameBoard };
})();

const newGameboard = gameBoard.newGameBoard();
displayController.showGameBoard(newGameboard);
