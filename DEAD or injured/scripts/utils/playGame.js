import { guessInformation } from "../guess-page.js";
import compareCode from "./codeCOmparer.js";

export default function playGame(){
    let guessStatus = compareCode(guessInformation.comCode, guessInformation.playerGuess);
    return `<div class="guess-display-result-each">${guessInformation.playerGuess}: ${guessStatus.dead} dead ${guessStatus.injured} injured</div>`
}