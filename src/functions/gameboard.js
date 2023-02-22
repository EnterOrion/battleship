import shipFactory from "./ships";
const SIZE = 10;


const gameboardFactory = () => {
    let board = [];
    let shipCounter = 0;
    let ships = 5;
    let carrierShip = shipFactory(5, 'a');
    let battleShip = shipFactory(4, 'b');
    let cruiserShip = shipFactory(3, 'c');
    let submarineShip = shipFactory(3, 'd');
    let destroyerShip = shipFactory(2, 'e');

 
 

    for (let i = 0; i < SIZE; i++) {
            board[i] = [];
        for (let j = 0; j < SIZE; j++) {
            board[i][j] = null;
        }
    }
    const placeShip = (length, id, horizontalStart, verticalStart, rotated) => {
      const isSpaceValid = (length, horizontalStart, verticalStart, rotated) => {
        if (rotated == true) {
          if (horizontalStart + length > 10) {
            return false;
          }
          for (let i = 0; i < length; i++) {
            if (board[horizontalStart + i][verticalStart] !== null) {
              return false;
            }
          }
          return true;
        } else {
          if (verticalStart + length > 10) {
            return false;
          }

          for (let i = 0; i < length; i++) {
            if (board[horizontalStart][verticalStart + i] !== null) {
              return false;
            }
          }
          return true;
        }
        };
        if (isSpaceValid(length, horizontalStart, verticalStart, rotated) == false)
        {
            return false;
        }
        else {
            if (rotated == true) {
                for (let i = 0; i < length; i++) {
                    board[horizontalStart + i][verticalStart] = id;
                }
            }
            else {
                for (let i = 0; i < length; i++) {
                    board[horizontalStart][verticalStart + i] = id;
                }
            }
            return true;
        }
    };

    const receiveAttack = (x, y) => {
        //change class of board so can't be attacked again
        if (board[x][y] == 'a') {
            carrierShip.hit();
            if (carrierShip.isSunk() == true) {
                console.log("sunk");
                ships--;
            }
          
        }

        else if (board[x][y] == 'b') {
            battleShip.hit();
            if (battleShip.isSunk() == true) {
                console.log("sunk");
                ships--;
            }
        }
    
        else if (board[x][y] == 'c') {
            cruiserShip.hit();
            if (cruiserShip.isSunk() == true) {
                console.log("sunk");
                ships--;
            }
        }

        else if (board[x][y] == 'd') {
            submarineShip.hit();
            if (submarineShip.isSunk() == true) {
                console.log("sunk");
                ships--;
            }
        }

        else if (board[x][y] == 'e') {
            destroyerShip.hit();
            if (destroyerShip.isSunk() == true) {
                console.log("sunk");
                ships--;
            }
        }
        else {
            board[x][y] = 0;
        }

    }

    const checkDefeat = () => {
        //ships fixed it
        if (ships == 0) {
            return true;
         }
         else {
            return false;
         }

    }

    const aiPlaceBoard = () => {
        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);
        let randomBoolean = Math.random() < 0.5;

        while (shipCounter<5) {
            if(shipCounter == 0) {
                if (placeShip(carrierShip.length, carrierShip.id, x, y, randomBoolean)) {
                    placeShip(carrierShip.length, carrierShip.id, x, y, randomBoolean);
                    shipCounter++;
                }
                else {
                    aiPlaceBoard();
                }
            }
            else if(shipCounter == 1) {
                if (placeShip(battleShip.length, battleShip.id, x, y, randomBoolean)) {
                    placeShip(battleShip.length, battleShip.id, x, y, randomBoolean);
                    shipCounter++;
                }
                else {
                    aiPlaceBoard();
                }
            }
            else if(shipCounter == 2) {
                if (placeShip(cruiserShip.length, cruiserShip.id, x, y, randomBoolean)) {
                    placeShip(cruiserShip.length, cruiserShip.id, x, y, randomBoolean);
                    shipCounter++;
                }
                else {
                    aiPlaceBoard();
                }
            }
            else if(shipCounter == 3) {
                if (placeShip(submarineShip.length, submarineShip.id, x, y, randomBoolean)) {
                    placeShip(submarineShip.length, submarineShip.id, x, y, randomBoolean);
                    shipCounter++;
                }
                else {
                    aiPlaceBoard();
                }
            }
            else if(shipCounter == 4) {
                if (placeShip(destroyerShip.length, destroyerShip.id, x, y, randomBoolean)) {
                    placeShip(destroyerShip.length, destroyerShip.id, x, y, randomBoolean);
                    shipCounter++;
                }
                else {
                    aiPlaceBoard();
                }
            }
        }
    }

    return {
        board,
        placeShip, 
        carrierShip,
        battleShip,
        cruiserShip,
        submarineShip,
        destroyerShip,
        checkDefeat,
        receiveAttack,
        aiPlaceBoard
    }
}





export default gameboardFactory;