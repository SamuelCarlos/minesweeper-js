const container = document.getElementById("container");
container.addEventListener("contextmenu", (event) => event.preventDefault());

var board = [];
var totalMines = 50;
var size = 16;

var tilesToOpen = size * size - 10;

const restartGame = () => {
  container.innerHTML = "";
  board = [];
  tilesToOpen = size * size - 10;
  game();
};

const createButton = (id = "", square) => {
  const slot = document.createElement("button");

  slot.id = id;

  slot.style.width = `${container.offsetWidth / size}px`;
  slot.style.height = `${container.offsetHeight / size}px`;

  title = square.value;

  if (square.flagged) {
    slot.innerText = "F";
    slot.style.backgroundColor = "#ddd";
    slot.style.color = "#ff0000";
    slot.style.fontWeight = "900";
    slot.style.fontSize = "1.5rem";
  }

  if (square.open) {
    if (title !== 0) slot.innerText = title;

    if (title === 0) {
      slot.style.backgroundColor = "#707070";
    }
    if (title === 1) {
      slot.style.backgroundColor = "#83AF9B";
    }
    if (title === 2) {
      slot.style.backgroundColor = "#C8C8A9";
    }
    if (title === 3) {
      slot.style.backgroundColor = "#F9CDAD";
    }
    if (title === 4) {
      slot.style.backgroundColor = "#FC9D9A";
    }
    if (title === 5) {
      slot.style.backgroundColor = "#FE4365";
    }
    if (title === 6) {
      slot.style.backgroundColor = "#990D35";
    }
    if (title === 7) {
      slot.style.backgroundColor = "#531253";
    }
    if (title === 8) {
      slot.style.backgroundColor = "#170312";
    }
  }

  return slot;
};

const startBoard = () => {
  const tempBoard = [];
  for (let i = 0; i < this.size; i++) {
    let row = [];
    for (let j = 0; j < this.size; j++) {
      row.push({ value: 0, flagged: false, open: false });
    }
    tempBoard.push(row);
  }
  board = tempBoard;
};

const openTile = (i, j) => {
  if (board[i][j].open === true || board[i][j].flagged === true) return;

  if (board[i][j].value === "x") {
    window.alert("Você perdeu");
    restartGame();
    return;
  }

  board[i][j].open = true;
  tilesToOpen -= 1;
  if (tilesToOpen === 0) {
    window.alert("Você ganhou");
    restartGame();
    return;
  }

  if (board[i][j].value === 0) {
    openBlankAdjacents(i, j);
  }
};

const showBoard = () => {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const button = createButton(`${i}-${j}`, board[i][j]);
      button.addEventListener("mousedown", (event) => {
        if (event.button == 2) {
          board[i][j].flagged = !board[i][j].flagged;
        } else if (!board[i][j].flagged) {
          openTile(i, j);
        }

        container.innerHTML = "";
        showBoard();
      });

      container.appendChild(button);
    }
  }
};

const fillBoardWithMines = () => {
  let minesLeft = totalMines;

  do {
    let positionX = Math.floor(Math.random() * size);
    let positionY = Math.floor(Math.random() * size);

    if (board[positionX][positionY].value !== "x") {
      board[positionX][positionY].value = "x";
      addNumberAround(positionX, positionY);
      minesLeft -= 1;
    }
  } while (minesLeft > 0);
};

const addNumberAround = (x, y) => {
  const positions = [];

  positions.push([x, y - 1]);
  positions.push([x, y + 1]);

  positions.push([x - 1, y]);
  positions.push([x - 1, y - 1]);
  positions.push([x - 1, y + 1]);

  positions.push([x + 1, y]);
  positions.push([x + 1, y - 1]);
  positions.push([x + 1, y + 1]);

  positions.forEach(([posX, posY]) => {
    if (posX >= 0 && posY >= 0 && posX < size && posY < size) {
      if (typeof board[posX][posY].value === "number") {
        board[posX][posY].value += 1;
      }
    }
  });
};

const openBlankAdjacents = (x, y) => {
  let positions = [];

  positions.push([x, y - 1]);
  positions.push([x, y + 1]);

  positions.push([x - 1, y]);

  positions.push([x + 1, y]);

  positions.push([x - 1, y - 1]);
  positions.push([x - 1, y + 1]);

  positions.push([x + 1, y - 1]);
  positions.push([x + 1, y + 1]);

  positions.forEach(([posX, posY]) => {
    if (posX >= 0 && posY >= 0 && posX < size && posY < size) {
      if (
        board[posX][posY].open === false &&
        board[posX][posY].flagged === false
      ) {
        openTile(posX, posY);
        if (board[posX][posY].value === 0) {
          openBlankAdjacents(posX, posY);
        }
      }
    }
  });
};

const game = () => {
  startBoard();
  fillBoardWithMines();
  showBoard();
};

game();
