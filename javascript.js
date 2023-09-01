const Player = (name, id) => {
  const game = [];
  const getGame = () => {
    return game;
  };
  function regPlayedCell(cellId) {
    game.push(parseInt(cellId));
  }
  return { name, id, regPlayedCell, getGame };
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
  let result;
  const newGame = () => {
    displayController.showGameBoard(gameboard);
    displayController.showPlayers(PlayerX, PlayerO);
  };
  function newPlay(cellChosen) {
    const myobj = gameboard.find((element) => element.id == cellChosen);
    myobj.available = false;
    myobj.playedBy = activePlayer;
    activePlayer.regPlayedCell(cellChosen);
    console.log(activePlayer.getGame());
    result = checkResults(activePlayer.getGame());
    console.log(result);
    if (result) {
      alert(`End of the Game, ${activePlayer.name} Wins!!`);
    }

    activePlayer == PlayerX
      ? (activePlayer = PlayerO)
      : (activePlayer = PlayerX);
    displayController.showGameBoard(gameboard);
  }

  function checkResults(playerGame) {
    let result = false;
    if (playerGame.length > 2) {
      const winningCombos = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7],
      ];

      winningCombos.forEach((combo) => {
        if (checkCombo(combo, playerGame)) {
          result = true;
        }
      });

      function checkCombo(winningCombo, playerGame) {
        return winningCombo.every((value) => {
          return playerGame.includes(value);
        });
      }
    }
    return result;
  }

  return { newGame, newPlay };
})();

const displayController = (function () {
  const gameBoardDisplay = document.querySelector("#gameboardDisplay");
  const playersDisplay = document.querySelector("#playersDisplay");
  const showPlayers = function (playerX, playerO) {
    playersDisplay.innerHTML = `${playerX.name} Plays with X and ${playerO.name} Plays with O`;
  };
  const showGameBoard = function (gameboard) {
    gameBoardDisplay.innerHTML = "";
    gameboard.forEach((element) => {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("id", element.id);
      element.available
        ? (cell.style.backgroundColor = "light-blue")
        : (cell.innerHTML = element.playedBy.id);
      gameBoardDisplay.appendChild(cell);

      cell.addEventListener("click", () => Game.newPlay(cell.id));
    });
  };

  return { showGameBoard, showPlayers };
})();

Game.newGame();
