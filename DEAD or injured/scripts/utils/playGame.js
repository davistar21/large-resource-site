import { guessInformation } from "../guess-page.js";
import compareCode from "./codeCOmparer.js";

export default function playGame(){
    console.log(guessInformation);
    let guessStatus = compareCode(guessInformation.comCode, guessInformation.playerGuess);
    console.log(guessStatus)
}