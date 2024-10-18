// import { guessInformation } from "./data/guess-information.js";
import { toggleMenu } from "./toggleMenu.js";
import { checkPlayerGuess } from "./utils/checkPlayerGuess.js";
import generateSecretCode from "./utils/generateSecretCode.js";
import moveToNext from "./utils/moveToNext.js";

const ComputerSecretCode = generateSecretCode()
const guessInputElem = document.querySelectorAll('.guess-input')
const goButtonElem = document.querySelector('.go-button')

export let guessInformation;
guessInformation = JSON.parse(localStorage.getItem('guessInformation', guessInformation))

document.querySelector('.hamburger').addEventListener('click',()=>{toggleMenu()})

document.getElementById('1').focus();

let playerGuess = '';

guessInputElem.forEach(element => {
    element.addEventListener('input', (e)=>{
        playerGuess += e.target.value;
        let numberId = Number(element.id);
        numberId++;
        moveToNext(e.target, numberId, 4)
        if (checkPlayerGuess(playerGuess)) {
            goButtonElem.disabled = false;
        }
    })
    
})
goButtonElem.disabled = true;

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

