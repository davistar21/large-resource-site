import { guessInformation } from "../guess-page.js";
import compareCode from "./codeCOmparer.js";

export default function playGame(){
    console.log(guessInformation)
    let guessStatus = compareCode(guessInformation.comCode, guessInformation.playerGuess);
    guessInformation.dead = guessStatus.dead;
    guessInformation.injured = guessStatus.injured
    return `<div class="guess-display-result-each">${guessInformation.playerGuess}: ${guessStatus.dead} dead ${guessStatus.injured} injured</div>`
}