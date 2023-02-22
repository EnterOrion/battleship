import player from "./player";

const gameTest = () => {
const humanPlayer = player("Player");
const aiPlayer = player("Computer");
let rotateShip = false;

const createBoard = (width, height, boardID, gridClass) => {
    const board = document.getElementById(boardID);
    board.style.setProperty('--grid-rows', width);
    board.style.setProperty('--grid-cols', height);
  for (let c = 0; c < (width * height); c++) {
    let cell = document.createElement("div");
    board.appendChild(cell).className = gridClass;
 
  }
};
  
createBoard(humanPlayer.gameboard.board.length, humanPlayer.gameboard.board.length, "gameboard", "grid-item");

const rotateButton = document.getElementById("rotate-button");
rotateButton.addEventListener("click", () => {
  if (rotateShip == false) {
    rotateShip = true;
  }
  else {
    rotateShip = false;
  }
}
)
aiPlayer.gameboard.aiPlaceBoard();

function getGridElementsPosition(index, boardID) {
  const board = document.getElementById(boardID);
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
   
      let position = getGridElementsPosition(getNodeIndex(e.target), "gameboard");
      
      if (humanPlayer.gameboard.placeShip(length, id, position.row, position.column, rotateShip)) {
        shipCounter++;
        
        console.log(aiPlayer.gameboard.board);
        if (shipCounter == 5) {
          gridItems[i].onmouseup = () => {
          gridItems[i].removeAttribute('id')
          }
          // fixes display issues
          gridItems[i].onmouseleave = () => {
            gridItems[i].removeAttribute('id')
            }
            
          const startButton = document.getElementById("start-button")
          startButton.style.display = "block";
          startButton.addEventListener("click", () => {
            createBoard(10, 10, "enemy-gameboard", "grid-item-enemy");
            startButton.style.display = "none";
            rotateButton.style.display = "none";
            document.querySelector("h1").style.display = "block";
            addAttackEvent();
          })
          
          
        }
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
      }


      



    };
    gridItems[i].onmouseup = () => {
      gridItems[i].removeAttribute('id');
    }
    // fixes display issues
    gridItems[i].onmouseleave = () => {
      gridItems[i].removeAttribute('id')
      }

  



  }

  
}
function addAttackEvent() {
  let gridItems = document.getElementsByClassName("grid-item-enemy");
  let gameOver = false;
  for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].onclick = (e) => {
      let position = getGridElementsPosition(getNodeIndex(e.target), "enemy-gameboard");
      //console.log(`Node position is row ${position.row}, column ${position.column}`);
      if (aiPlayer.gameboard.board[position.row][position.column] !== null && gameOver == false) {
          gridItems[(position.row*10 + position.column)].textContent = "💥";
          aiPlayer.gameboard.receiveAttack(position.row, position.column);
          
      }
      else if (gameOver == false) {
        gridItems[(position.row*10 + position.column)].textContent = "〰️";
        
      }
      if (gameOver == false) {
      let humanPosition = aiPlayer.aiAttack();
      console.log(humanPosition);
      let x = humanPosition[0];
      let y = humanPosition[1];
      
    
     let gridItems2 = document.getElementsByClassName("grid-item");
     if (humanPlayer.gameboard.board[x][y] !== null) {
      gridItems2[(x*10 + y)].textContent = "💥";
      humanPlayer.gameboard.receiveAttack(x, y);
    
    }
    else {
      gridItems2[(x*10 + y)].textContent = "〰️";
    }
  }
     
    if (aiPlayer.gameboard.checkDefeat() == true) {
      document.querySelector("h1").textContent = "Player 1 wins";
      gameOver = true;
      return;
    }
    else if (humanPlayer.gameboard.checkDefeat() == true) {
      document.querySelector("h1").textContent = "Computer wins";
      gameOver = true;
      return;
    }
    }

    }
  
  }
  addClickEventsToGridItems();
}


export default gameTest;