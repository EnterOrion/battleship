import player from "./player";

const gameTest = () => {
const humanPlayer = player("Player");
const aiPlayer = player("Computer");
let rotateShip = false;

const createBoard = (width, height) => {
    const board = document.getElementById("gameboard");
    board.style.setProperty('--grid-rows', width);
    board.style.setProperty('--grid-cols', height);
  for (let c = 0; c < (width * height); c++) {
    let cell = document.createElement("div");
    board.appendChild(cell).className = "grid-item";
 
  }
};
  
createBoard(humanPlayer.gameboard.board.length, humanPlayer.gameboard.board.length);
document.querySelector("button").addEventListener("click", () => {
  if (rotateShip == false) {
    rotateShip = true;
  }
  else {
    rotateShip = false;
  }
}
)


function getGridElementsPosition(index) {
  const board = document.getElementById("gameboard");
  let offset = 0;
  const colCount = window.getComputedStyle(board).gridTemplateColumns.split(" ").length;

  const rowPosition = Math.floor((index + offset) / colCount);
  const colPosition = (index + offset) % colCount;

  return { row: rowPosition, column: colPosition };
}

function getNodeIndex(elm) {
  var c = elm.parentNode.children,
    i = 0;
  for (; i < c.length; i++) if (c[i] == elm) return i;
}

function addClickEventsToGridItems(length, id) {
  let gridItems = document.getElementsByClassName("grid-item");
  let shipCounter = 0;
  for (let i = 0; i < gridItems.length; i++) {
   
    gridItems[i].onmousedown = (e) => {
      gridItems[i].setAttribute('id', 'black-click')

      if (shipCounter == 0) {
        length = humanPlayer.gameboard.carrierShip.length;
        id = humanPlayer.gameboard.carrierShip.id;
      }
      else if (shipCounter == 1) {
        length = humanPlayer.gameboard.battleShip.length;
        id = humanPlayer.gameboard.battleShip.id;
      }
      else if (shipCounter == 2) {
        length = humanPlayer.gameboard.cruiserShip.length;
        id = humanPlayer.gameboard.cruiserShip.id;
      }
      else if (shipCounter == 3) {
        length = humanPlayer.gameboard.submarineShip.length;
        id = humanPlayer.gameboard.submarineShip.id;
      }
      else if (shipCounter == 4) {
        length = humanPlayer.gameboard.destroyerShip.length;
        id = humanPlayer.gameboard.destroyerShip.id;
      }
      else {
        return;
      }
      shipCounter++;
      let position = getGridElementsPosition(getNodeIndex(e.target));
      
      humanPlayer.gameboard.placeShip(length, id, position.row, position.column, rotateShip)
      
      console.log(humanPlayer.gameboard.board)


      if (rotateShip == false) {
      for (let j=0; j<length; j++) {
        gridItems[(position.row*10 + position.column) + j].textContent = "⬜";
      }
      
      }
      else {
        for (let j=0; j<length; j++) {
          gridItems[(position.row*10 + position.column) + (j * 10)].textContent = "⬜";
        }
      }



    };
    gridItems[i].onmouseup = () => {
      gridItems[i].removeAttribute('id');
    }

  }
}

addClickEventsToGridItems();

  
}
export default gameTest;