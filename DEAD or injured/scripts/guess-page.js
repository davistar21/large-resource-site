import { guessInformation } from "./data/guess-information.js";
import generateSecretCode from "./utils/generateSecretCode.js";

const ComputerSecretCode = generateSecretCode()
const guessInputElem = document.querySelector('.guess-input')
const goButtonElem = document.querySelector('.go-button')


// console.log(guessInformation)
let storedGuessInformation = JSON.parse(localStorage.getItem('guessInformation', guessInformation))
goButtonElem.addEventListener('click', ()=>{console.log(storedGuessInformation)})