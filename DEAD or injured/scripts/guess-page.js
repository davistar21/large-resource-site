// import { guessInformation } from "./data/guess-information.js";
import { toggleMenu } from "./toggleMenu.js";
import generateSecretCode from "./utils/generateSecretCode.js";
import moveToNext from "./utils/moveToNext.js";

const ComputerSecretCode = generateSecretCode()
const guessInputElem = document.querySelectorAll('.guess-input')
const goButtonElem = document.querySelector('.go-button')

export let guessInformation;
guessInformation = JSON.parse(localStorage.getItem('guessInformation', guessInformation))

document.querySelector('.hamburger').addEventListener('click',()=>{toggleMenu()})

document.getElementById('1').focus();

let checkSet = new Set;
let playerGuess = '';

guessInputElem.forEach(element => {
    element.addEventListener('input', (e)=>{
        checkSet.add(e.target.value);
        playerGuess += e.target.value;
        let numberId = Number(element.id);
        numberId++;
        moveToNext(e.target, numberId, 4)
    })
})

// console.log(guessInformation)
goButtonElem.addEventListener('click', ()=>{
    document.getElementById('1').focus();
    checkSet.clear();
    guessInformation.playerGuess = Number(playerGuess);
    guessInputElem.forEach(element => {
        element.value = ''
    })
    console.log(guessInformation)})


