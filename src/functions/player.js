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
        let x = Math.random() * 9;
        let y = Math.random() * 9;
        for (let i=0; i<moveArray.length; i++) {
            if(parseInt(moveArray[i]) == parseInt([x,y])) {
                aiAttack();
            }
            else {
                moveArray.push([x,y])
                return [x, y]
            }
        }
     
    }

    return {
        name,
        gameboard,
        simpleAttack,
        aiAttack

    }
} 

export default player;