import { guessInformation } from "../guess-page.js";
import compareCode from "./codeCOmparer.js";
import saveToStorage from "./saveToStorage.js";

let isCurrentlyPlaying:boolean = true;

interface Status {
    dead: number,
    injured: number
}
export default function playGame(){
    let guessStatus:Status = compareCode(guessInformation.comCode, guessInformation.playerGuess);
    guessInformation.dead = guessStatus.dead;
    guessInformation.injured = guessStatus.injured;

    if(guessInformation.playerGuess == guessInformation.totalGuessChances) {
        console.log("Winner!");
    }
}