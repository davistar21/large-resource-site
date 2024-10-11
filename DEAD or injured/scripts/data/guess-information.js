import totalChances from "../utils/totalChances";

const guessInformation = {
    playerGuess: document.querySelector('.guess-input').value,
    dead: 0,
    injured: 0,
    currentChance: 0,
    totalChances: totalChances(document.querySelector('.guess-chances-left')),
}