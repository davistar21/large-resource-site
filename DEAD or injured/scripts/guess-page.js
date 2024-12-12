// import { guessInformation } from "./data/guess-information.js";
import { toggleMenu } from "./toggleMenu.js";
import { checkPlayerGuess } from "./utils/checkPlayerGuess.js";
import generateSecretCode from "./utils/generateSecretCode.js";
import moveToNext, { moveToPrevious } from "./utils/moveToNext.js";
import playGame from "./utils/playGame.js";

const comCode = generateSecretCode();
// const guessInputElem = document.querySelectorAll('.guess-input');
const goButtonElem = document.querySelector('.go-button');
const clearButtonElem = document.querySelector('.clear-button')

export let guessInformation;
guessInformation = JSON.parse(localStorage.getItem('guessInformation', guessInformation))
let playerGuessElem = document.querySelector('.player-guess');
document.querySelector('.hamburger').addEventListener('click',()=>{toggleMenu()})

// document.getElementById('1').focus();

let playerGuess = '';

/*guessInputElem.forEach(element => {
    element.addEventListener('input', (e)=>{
        playerGuess += element.value;
        let numberId = Number(element.id);
        numberId++;
        moveToNext(e.target, numberId, 4);
        if (checkPlayerGuess(playerGuess)) {
            goButtonElem.disabled = false;
        }
        console.log(element.value)
    })
    element.addEventListener('keydown', (event)=>{
        if (event.key == 'Backspace') {
            let numberId = Number(element.id);
            numberId--;
            moveToPrevious(element, numberId)
            
        }
    })
})*/
clearButtonElem.disabled = true;
clearButtonElem.addEventListener('click', ()=>{
    playerGuessElem.value = '';
    clearButtonElem.disabled = true;
    goButtonElem.disabled = true;
});


// console.log(guessInformation)
playerGuessElem.addEventListener('input', (e)=>{
    if (e.target.value.length === 4 && checkPlayerGuess(playerGuessElem.value)){
        goButtonElem.disabled = false;
    } else {
        goButtonElem.disabled = true;
    }
    if(e.target.value.length !== 0){
        clearButtonElem.disabled = false;
    } else{
        clearButtonElem.disabled = true;
    }
})
goButtonElem.disabled = true;
goButtonElem.addEventListener('click', ()=>{
    // document.getElementById('1').focus();
    /*guessInputElem.forEach(element => {
        element.value = ''
    })*/
//    if(checkPlayerGuess(playerGuessElem.value)){
//     goButtonElem.disabled = false;
//     playerGuess = playerGuessElem.value;
//     guessInformation.playerGuess = Number(playerGuess)
//    }
//     playerGuessElem.value = '';
    playerGuess = playerGuessElem.value;
    guessInformation.playerGuess = playerGuess;
    guessInformation.comCode = comCode;
    playGame()

    playerGuessElem.value = '';
    goButtonElem.disabled = true;
    clearButtonElem.disabled = true;
    
});

