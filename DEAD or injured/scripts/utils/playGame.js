import { guessInformation } from "../guess-page.js";
import compareCode from "./codeCOmparer.js";
import saveToStorage from "./saveToStorage.js";

export default function playGame(){
    let guessStatus = compareCode(guessInformation.comCode, guessInformation.playerGuess);
    guessInformation.dead = guessStatus.dead;
    guessInformation.injured = guessStatus.injured;
    console.log(guessInformation)
    saveToStorage(guessInformation)
    return `<div class="guess-display-result-each">${guessInformation.playerGuess}: ${guessStatus.dead} dead ${guessStatus.injured} injured</div>`
}