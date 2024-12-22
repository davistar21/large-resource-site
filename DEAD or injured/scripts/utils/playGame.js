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

    if (guessInformation.currentGuess < guessInformation.totalGuessChances){
        // saveToStorage(guessInformation);
        return `<div class="guess-display-result-each">${guessInformation.playerGuess}: ${guessStatus.dead} dead ${guessStatus.injured} injured</div>`
    }
    if(guessInformation.playerGuess == guessInformation.comCode && isCurrentlyPlaying){
        console.log("You win!");
        isCurrentlyPlaying = false;
        return `You win!`
    }
    if (guessInformation.currentGuess == guessInformation.totalGuessChances && isCurrentlyPlaying){
        console.log("Game Over!");
        isCurrentlyPlaying = false;
        return `Game Over!`
    };
    
    
}

const increaseCurrentGuess = guess => {return guess + 1};

export function displayChancesLeft() {
    let used = guessInformation.currentGuess;
    let notUsed = guessInformation.chancesLeft;
    let usedDots = ''
    let notUsedDots = ''
    for (let i = 0; i < notUsed; i++){
        notUsedDots += `<button></button>`;
    };
    for (let i = 0; i < used; i++){
        usedDots += `<button class="disabled"></button>`
    }
    return `
        <p class="guess-chances-left">You have ${notUsed} chances left</p>
        <div class="chances-left-dots">
        ${notUsedDots}${usedDots}
        </div>`
    }