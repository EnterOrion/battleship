import gameboardFactory from "./gameboard";

const player = (name) => {
    const gameboard = gameboardFactory();
    let moveArray = [];

    //The values will be obtained by the user clicking on the board
    const simpleAttack = () => {
        let x = null;
        let y = null;
        return [x, y]
    }
    const aiAttack = () => {
        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);
     
        for (let i=0; i<moveArray.length; i++) {
            if(moveArray[i][0] == x && moveArray[i][1] == y) {
             
                x = Math.floor(Math.random() * 10);
                y = Math.floor(Math.random() * 10);
                i = 0;
            }
            
        }


        moveArray.push([x,y])
        return [x, y]
     
    }

    return {
        name,
        gameboard,
        simpleAttack,
        aiAttack

    }
} 

export default player;