// import { guessInformation } from "./data/guess-information.js";
import { toggleMenu } from "./toggleMenu.js";
import { checkPlayerGuess } from "./utils/checkPlayerGuess.js";
import generateSecretCode from "./utils/generateSecretCode.js";
import moveToNext, { moveToPrevious } from "./utils/moveToNext.js";

const ComputerSecretCode = generateSecretCode()
const guessInputElem = document.querySelectorAll('.guess-input');
const goButtonElem = document.querySelector('.go-button');
const clearButtonElem = document.querySelector('.clear-button')

export let guessInformation;
guessInformation = JSON.parse(localStorage.getItem('guessInformation', guessInformation))

document.querySelector('.hamburger').addEventListener('click',()=>{toggleMenu()})

document.getElementById('1').focus();

let playerGuess = '';

guessInputElem.forEach(element => {
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
})
goButtonElem.disabled = true;
clearButtonElem.addEventListener('click', ()=>{
    guessInputElem.forEach(element => {
        element.value = '';
    })
    // checkPlayerGuess(playerGuess)
})


// console.log(guessInformation)
goButtonElem.addEventListener('click', ()=>{
    
    document.getElementById('1').focus();
    guessInputElem.forEach(element => {
        element.value = ''
    })
    guessInformation.playerGuess = Number(playerGuess)
    console.log(guessInformation);
    goButtonElem.disabled = true;
    console.log(playerGuess)
    playerGuess = '';
});

