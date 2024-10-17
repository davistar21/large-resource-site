import { guessInformation } from "./data/guess-information.js";
import { playerInformation } from "./data/player-information.js";
import totalChances from "./utils/totalChances.js";

let currentStep = 0;
const steps = document.querySelectorAll('.form-step');
// console.log(steps[steps.length-1])
const nextButton = document.createElement('button')
nextButton.innerHTML = '&rarr;';
nextButton.classList.add('next-button')
document.querySelector('.user-form').appendChild(nextButton)

nextButton.addEventListener('click', ()=> {
    nextStep(event)
})
// let currentElement, nextElement;
function nextStep(event) {
    event.preventDefault();
    let currentElement = steps[currentStep];
    let nextElement = steps[currentStep + 1];
    currentElement.classList.add('leave-to-right')
    setTimeout(()=>{
        currentElement.classList.remove('active')
    }, 1)
    currentStep++
    if (currentStep < steps.length){
        nextElement.classList.add('active','enter-from-left')
        // setTimeout
    }
    if (currentStep == steps.length-1){
        nextButton.style.display = 'none'
    }
}
// nextButton.disabled = true
document.querySelectorAll('input').forEach(e => {
    e.addEventListener('input', (f)=>{
        if (f.target.value){
            nextButton.disabled = false
        }
    })
    // nextButton.disabled = true
})

// localStorage.setItem('guessInformation', JSON.stringify(guessInformation))
// export let guessInformation = {}
// export let guessInformation = JSON.parse(localStorage.getItem('guessInformation', guessInformation))
document.querySelector('.redirect-to-guess-page').addEventListener('click', ()=>{
    // let {totalChance} = guessInformation;
    // totalChance = totalChances(difficulty)
    // guessInformation.totalChance = totalChances(difficulty)
    const selectedDifficulty = document.getElementById('difficulty').value;
    guessInformation.selectedDifficulty = selectedDifficulty
    guessInformation.totalGuessChances = totalChances(selectedDifficulty)

    localStorage.setItem('guessInformation', JSON.stringify(guessInformation));

    playerInformation.name = document.getElementById('name').value;
    playerInformation.email = document.getElementById('email').value;

    localStorage.setItem('playerInformation', playerInformation)
})

