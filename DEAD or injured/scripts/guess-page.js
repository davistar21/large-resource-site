import { guessInformation } from "./data/guess-information.js";
import generateSecretCode from "./utils/generateSecretCode.js";

const ComputerSecretCode = generateSecretCode()
const guessInputElem = document.querySelector('.guess-input')
const goButtonElem = document.querySelector('.go-button')

// Function to toggle the visibility of the menu
function toggleMenu() {
    const menuItems = document.getElementById('menuItems');
    menuItems.classList.toggle('active');
}
document.querySelector('.hamburger').addEventListener('click',()=>{toggleMenu()})

// console.log(guessInformation)
let storedGuessInformation = JSON.parse(localStorage.getItem('guessInformation', guessInformation))
goButtonElem.addEventListener('click', ()=>{console.log(storedGuessInformation)})