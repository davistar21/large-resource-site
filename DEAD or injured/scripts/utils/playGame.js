import { guessInformation } from "../guess-page.js";
import compareCode from "./codeCOmparer.js";
import saveToStorage from "./saveToStorage.js";

let isCurrentlyPlaying = false;
export default function playGame(win, lose, endGame){
    let guessStatus = compareCode(guessInformation.comCode, guessInformation.playerGuess);
    guessInformation.dead = guessStatus.dead;
    guessInformation.injured = guessStatus.injured;
    if (guessInformation.currentGuess < guessInformation.totalGuessChances){
        isCurrentlyPlaying = true;
        guessInformation.currentGuess = increaseCurrentGuess(guessInformation.currentGuess);
        guessInformation.chancesLeft = guessInformation.totalGuessChances - guessInformation.currentGuess
        console.log(isCurrentlyPlaying, guessInformation.comCode);
        if(guessInformation.chancesLeft == 0 && guessInformation.playerGuess !== guessInformation.comCode){
            lose();
            isCurrentlyPlaying = false;
        };
        if(guessInformation.playerGuess === guessInformation.comCode){
            console.log("You Win!");
            win();
            isCurrentlyPlaying = false
        };
        if(isCurrentlyPlaying == false) {
            endGame()
        };
        if (guessInformation.chancesLeft == 3){
            if (!document.querySelector('.guess-chances-left').classList.contains('red-shake-animation')){
                console.log(document.querySelector('.guess-chances-left').classList)
            }
            document.querySelector('.guess-chances-left').classList.add('red-shake-animation')
        }
        // saveToStorage(guessInformation);
        return `<div class="guess-display-result-each">${guessInformation.playerGuess}: ${guessStatus.dead} dead ${guessStatus.injured} injured</div>`
    }
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
    if (notUsed == 1){
        return `<p class="guess-chances-left">You have ${notUsed} chance left</p>
        <div class="chances-left-dots">
        ${notUsedDots}${usedDots}
        </div>`
    }
    return `
        <p class="guess-chances-left">You have ${notUsed} chances left</p>
        <div class="chances-left-dots">
        ${notUsedDots}${usedDots}
        </div>`
    }

