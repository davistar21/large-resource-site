import { guessInformation } from "./data/guess-information.js";
import { toggleMenu } from "./toggleMenu.js";
import generateSecretCode from "./utils/generateSecretCode.js";
import moveToNext from "./utils/moveToNext.js";

const ComputerSecretCode = generateSecretCode()
const guessInputElem = document.querySelector('.guess-input')
const goButtonElem = document.querySelector('.go-button')

// Function to toggle the visibility of the menu

document.querySelector('.hamburger').addEventListener('click',()=>{toggleMenu()})
document.getElementById('1').focus();
document.querySelectorAll('.guess-input').forEach(element => {
    element.addEventListener('input', (e)=>{
        let numberId = Number(element.id)
        numberId++
        moveToNext(e.target, numberId, 4)
    })
})

// console.log(guessInformation)
let storedGuessInformation = JSON.parse(localStorage.getItem('guessInformation', guessInformation))
goButtonElem.addEventListener('click', ()=>{console.log(storedGuessInformation)})