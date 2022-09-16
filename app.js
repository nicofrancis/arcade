const ticTacToe = {
  gameState: {
    gameStarted: false,
    gameWon: false,
    board: ["", "", "", "", "", "", "", "", ""],
    currentPlayer: "X",
  },
  winnerMessage: document.getElementById("winnerMsg"),
  boardGame: document.getElementById("board"),
  startGame: document.getElementById("start-game"),
  resetGame: document.getElementById("reset-game"),
  tileBox: document.getElementsByClassName("tileSquare"),
  curPlay: document.getElementById("whosUp"),
  winningCombo: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ],

  boardGameClick: function boardGameClick(clickEvent) {
    if (this.gameState.gameWon === true) return false;

    const selectedTile = clickEvent.target;
    const currentCell = parseInt(selectedTile.id.replace("cell-", ""));

    console.log(currentCell, this.gameState.currentPlayer);

    if (this.gameState.board[currentCell] === "") {
      this.gameState.board[currentCell] = this.gameState.currentPlayer;
      this.takeTurn();
    }
  },

  takeTurn: function takeTurn() {
    this.renderTurn();
    this.renderBoard();
    this.switchPlayer();
  },

  switchPlayer: function switchPlayer() {
    if (this.gameState.currentPlayer === "X") {
      this.gameState.currentPlayer = "O";
    } else {
      this.gameState.currentPlayer = "X";
    }

    if (this.gameState.gameWon === false) {
      this.curPlay.innerText = `It's ${this.gameState.currentPlayer}'s turn.`;
    }
  },

  renderTurn: function renderTurn() {
    for (let i = 0; i < this.winningCombo.length; i++) {
      let condition = this.winningCombo[i];
      let a = this.gameState.board[condition[0]];
      let b = this.gameState.board[condition[1]];
      let c = this.gameState.board[condition[2]];

      if (a == "" || b == "" || c == "") {
        continue;
      }

      if (a == b && b == c) {
        this.curPlay.innerText = `${a} Won 🎉`;
        this.gameState.gameWon = true;
      }
    }

    if (this.gameState.board.indexOf("") <= -1) {
      this.curPlay.innerText = "It's a draw ✏️ Play again!";
      this.gameState.gameWon = true;
    }
  },

  renderBoard: function renderBoard() {
    for (let i = 0; i < this.gameState.board.length; i++) {
      const currDiv = document.getElementById(`cell-${i}`);
      currDiv.innerText = this.gameState.board[i];
    }
  },

  restartGame: function restartGame() {
    this.gameState.board = ["", "", "", "", "", "", "", "", ""];
    this.gameState.currentPlayer = "X";
    this.gameState.gameStarted = true;
    this.gameState.gameWon = false;
    this.tileBox.innerText = null;

    this.renderBoard();

    this.curPlay.innerText = `It's ${this.gameState.currentPlayer}'s turn.`;
  },

  init: function init() {
    this.startGame.addEventListener("click", () => {
      if (this.gameState.gameStarted === false) {
        this.boardGame.addEventListener(
          "click",
          this.boardGameClick.bind(this)
        );
        this.restartGame();
      }
    });

    this.resetGame.addEventListener("click", () => {
      if (this.gameState.gameStarted === true) {
        this.restartGame();
      }
    });
  },
};

ticTacToe.init();
