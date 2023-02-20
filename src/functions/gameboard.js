import shipFactory from "./ships";
const SIZE = 10;


const gameboardFactory = () => {
    let board = [];
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
        }

        else if (board[x][y] == 'b') {
            battleShip.hit();
        }
    
        else if (board[x][y] == 'c') {
            cruiserShip.hit();
        }

        else if (board[x][y] == 'd') {
            submarineShip.hit();
        }

        else if (board[x][y] == 'e') {
            destroyerShip.hit();
        }
        else {
            board[x][y] = 0;
        }

    }

    const checkDefeat = () => {
        if (carrierShip.isSunk() == true 
        && battleShip.isSunk() == true
        && cruiserShip.isSunk() == true 
        && submarineShip.isSunk() == true 
        && destroyerShip.isSunk() == true) {
            return true;
         }
         else {
            return false;
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
        receiveAttack,
        checkDefeat
    }
}





export default gameboardFactory;