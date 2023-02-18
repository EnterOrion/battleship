import "./style/style.scss";
import gameboardFactory from "./functions/gameboard";


const gameboard = gameboardFactory();


let main = () => {
      console.log(gameboard.board);
}

main();