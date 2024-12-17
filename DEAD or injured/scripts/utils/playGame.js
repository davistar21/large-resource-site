import { guessInformation } from "../guess-page.js";
import compareCode from "./codeCOmparer.js";
import saveToStorage from "./saveToStorage.js";

let isCurrentlyPlaying = true;

export default function playGame(){
    let guessStatus = compareCode(guessInformation.comCode, guessInformation.playerGuess);
    guessInformation.dead = guessStatus.dead;
    guessInformation.injured = guessStatus.injured;
    guessInformation.currentGuess = increaseCurrentGuess(guessInformation.currentGuess);
    guessInformation.chancesLeft = guessInformation.totalGuessChances - guessInformation.currentGuess
    if(guessInformation.playerGuess == guessInformation.comCode && isCurrentlyPlaying){
        console.log("You win!");
        isCurrentlyPlaying = false;
    }
    if (guessInformation.currentGuess == guessInformation.totalGuessChances && isCurrentlyPlaying){
        console.log("Game Over!");
        isCurrentlyPlaying = false;
    };
    
    saveToStorage(guessInformation);
    console.log(guessInformation.chancesLeft, "chances left!");
    return `<div class="guess-display-result-each">${guessInformation.playerGuess}: ${guessStatus.dead} dead ${guessStatus.injured} injured</div>`
}

const increaseCurrentGuess = guess => {return guess + 1}