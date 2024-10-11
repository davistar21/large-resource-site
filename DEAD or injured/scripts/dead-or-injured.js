let guessInputElem = document.querySelector('.js-guess-input')
let goButtonElem = document.querySelector('.go-button')
let guessDisplay = document.querySelector('.js-display-guesses')
let displayRemark = document.querySelector('.js-display-remark')
let replayElem = document.querySelector('.js-replay');
let playerName = document.querySelector('.player-name');
let difficulty = document.getElementById('difficulty')
let submitButtonElem = document.querySelector('.submit-button')
let containerOfGuesses = document.querySelector('.guessing-game-container')
let informationOfPlayer = document.querySelector('.player-info')
let htmGuessNumber = document.querySelector('.guess-number')
let chancesLeft = document.querySelector('.chances-left');
let gameInstructions = document.querySelector('.game-instructions')
let restartButtonElem = document.querySelector('.restart-button');
let autoPlayButtonElem = document.querySelector('.autoplay-button');

let guessesContainer = [];
playerName.focus()
displayRemark.innerHTML = ''

containerOfGuesses.classList.add('remove-display')
function randomNumberGenerator() {
    const randomNumber = parseInt((Math.random())*10)
    return String(randomNumber)
}
let secretCode;
function generateSecretCode() {
    const a = randomNumberGenerator()
    const b = randomNumberGenerator()
    const c = randomNumberGenerator()
    const d = randomNumberGenerator()
    if (a !== b && a !== c && a !== d && b !== c && b !== d && c !== d) {
        secretCode = a + b + c + d
    } else {
        generateSecretCode()
    }
    return secretCode
}

const playerInfo = {playerName, difficulty};
submitButtonElem.addEventListener('click', ()=> {
    displayRemark.innerHTML = ''
    playerInfo.playerName = playerName.value;
    playerInfo.difficulty = difficulty.value;
    if (playerInfo.difficulty === 'easy') {
        guhuju = 15;
    } else if (playerInfo.difficulty === 'medium') {
        guhuju = 10;
    } else if (playerInfo.difficulty === 'hard') {
        guhuju = 5;
    }
    playerInfo.guhuju = guhuju;
    playerInfo.weAreCountingGuesses = guhuju;
    console.log(playerInfo)
    containerOfGuesses.classList.remove('remove-display')
    informationOfPlayer.classList.add('remove-display')
    chancesLeft.innerHTML = `You have ${guhuju} attempts available`;
    for (let i = 0; i < playerInfo.guhuju; i++){
        htmGuessNumber.innerHTML += `<button class="guess-number-item"></button>`
    }
    gameInstructions.classList.remove('remove-display')
    document.querySelector('.bottom-buttons').classList.remove('remove-display')

})
let ComputerSecretCode = generateSecretCode();
function guessGame () {
    let itemObject = {};
    const playerGuess = guessInputElem.value;
    let dead = 0;
    let injured = 0;
    for (let i = 0; i < 4; i++){
        if (ComputerSecretCode[i] === playerGuess[i]){
            dead++
        } else if (ComputerSecretCode[i] !== playerGuess[i] && ComputerSecretCode.includes(playerGuess[i])){ //eureka moment here!!!!!!!!
            injured++
        }
    }
    itemObject.ComputerSecretCode = ComputerSecretCode;
    itemObject.playerGuess = playerGuess;
    itemObject.dead = dead;
    itemObject.injured = injured;


    guessesContainer.push(itemObject)
    return guessesContainer;
}

let guessCount = 0;
let gameOver = false;
goButtonElem.addEventListener('click', () => {
    functionOfGo()
})

function functionOfGo () {
    htmGuessNumber.innerHTML = '';
    guessInputElem.focus()
    guessCount++;
    let guessesContainer = guessGame(); //i previously put this line in the next if statement and that prevented the code...Ijust fixed it rn and i am so happy//21:39, 16/09/2024
    if (guessCount < playerInfo.guhuju) {
        if (guessesContainer[guessesContainer.length - 1].dead === 4){
            console.log('You Win!');
            goButtonElem.disabled = true;
            gameOver = true;
            displayRemark.classList.add('display-animation');
            displayRemark.innerHTML =  `You Win ${playerName.value}!`
            replayGame()
            document.querySelector('.bottom-buttons').classList.add('remove-display')
        }
    } else {
        console.log('You have run out of chances!')
        goButtonElem.disabled = true;
        displayRemark.classList.add('display-animation');
        displayRemark.innerHTML = `<div>You have run out of chances, ${playerName.value}!</div><div> The secret code was ${ComputerSecretCode}</div>`;
        gameOver = true;
        replayGame()
        document.querySelector('.bottom-buttons').classList.add('remove-display')
    }
    guessInputElem.value = '';
    console.log(guessesContainer)
    const theHtml = `
    <div>
        <p>${guessesContainer[guessesContainer.length - 1].playerGuess}: </p>
        <p>${guessesContainer[guessesContainer.length - 1].dead} dead</p>
        <p>${guessesContainer[guessesContainer.length - 1].injured} injured</p>
    </div>
    `
    playerInfo.weAreCountingGuesses --;
    for (let i = 0; i < playerInfo.weAreCountingGuesses; i++){
        htmGuessNumber.innerHTML += `<button class="guess-number-item"></button>`
    }
    chancesLeft.innerHTML = `You have ${playerInfo.weAreCountingGuesses} chances left`
    guessDisplay.innerHTML += theHtml
    goButtonElem.disabled = true;
}
goButtonElem.disabled = true;
let distinctSet = ''
guessInputElem.addEventListener('input', (e) => {
    distinctSet = new Set(e.target.value)

    if(e.target.value.length === 4 && !gameOver && distinctSet.size === 4) {
        goButtonElem.disabled = false;
        
    } else {
        goButtonElem.disabled = true;
    }
    guessInputElem.addEventListener('keydown', (event) => {

        if (event.key === 'Enter' && e.target.value.length === 4 && !gameOver && distinctSet.size === 4){
            functionOfGo()
        }
    })
    
})
function replayGame () {
    setTimeout(()=>{
        replayElem.classList.add('display-animation')
        replayElem.innerHTML = `
        Do you want to play again? <button class="yes-button">Yes</button><button class="no-button">No</button>
        `
        document.querySelector('.yes-button').addEventListener('click', () => {
            containerOfGuesses.classList.add('remove-display');
            informationOfPlayer.classList.remove('remove-display');
            replayElem.innerHTML = '';
            guessDisplay.innerHTML = '';
            displayRemark.innerHTML = '';
            htmGuessNumber.innerHTML = '';
            gameOver = false;
            guessCount = 0;
            guessesContainer = []
            gameInstructions.classList.add('remove-display');
            ComputerSecretCode = generateSecretCode();
            removeAnimation()            
    })
        document.querySelector('.no-button').addEventListener('click', ()=>{
            displayRemark.innerHTML = 'Thanks for Playing!';
            setTimeout(() => {
            containerOfGuesses.classList.add('remove-display');
            informationOfPlayer.classList.remove('remove-display');
            }, 2000);
            replayElem.innerHTML = '';
            guessDisplay.innerHTML = '';
            htmGuessNumber.innerHTML = '';
            gameOver = false;
            guessCount = 0;
            guessesContainer = []
            gameInstructions.classList.add('remove-display');
            ComputerSecretCode = generateSecretCode();
            removeAnimation()
    })
    }, 1000)
    
}
document.querySelector('.quit-button').addEventListener('click', () => {
        containerOfGuesses.classList.add('remove-display');
        informationOfPlayer.classList.remove('remove-display');
        replayElem.innerHTML = '';
        guessDisplay.innerHTML = '';
        displayRemark.innerHTML = '';
        htmGuessNumber.innerHTML = '';
        guessInputElem.value = '';
        gameOver = false;
        guessCount = 0;
        guessesContainer = [];
        gameInstructions.classList.add('remove-display');
        ComputerSecretCode = generateSecretCode();
        removeAnimation()
})

let isGameInstructionDisplayed = false;
gameInstructions.addEventListener('click', () => {
    if (!isGameInstructionDisplayed){
        gameInstructions.innerHTML = `<div>WELCOME TO THE SECRET CODE GAME ${playerName.value}</div>

<div>HOW TO PLAY: Try guessing the four-digit secret code.</div>

<div>DEAD means the number is correct and in its right position</div>
<div>INJURED means the number is correct but in a wrong position</div>

<div>
For example, if the SECRET CODE is 1234 and you guess 1243, 
it will read as '2 dead, 2 injured' because 2 numbers are in the right position 
while the other two are not. </div>`
        isGameInstructionDisplayed = true;
    } else {
        gameInstructions.innerHTML = 'Game Instructions!'
        isGameInstructionDisplayed = false
    }
})
gameInstructions.classList.add('remove-display');
restartButtonElem.addEventListener('click', () => {
    htmGuessNumber.innerHTML = '';
    for (let i = 0; i < playerInfo.guhuju; i++){
        htmGuessNumber.innerHTML += `<button class="guess-number-item"></button>`
    }
    guessDisplay.innerHTML = '';
    chancesLeft.innerHTML = `You have ${playerInfo.guhuju} attempts available`
    playerInfo.weAreCountingGuesses = playerInfo.guhuju;
    guessCount = 0;
    
    ComputerSecretCode = generateSecretCode();
})

let isAutoPlaying = false;
let autoPlayIntervalId;
autoPlayButtonElem.addEventListener('click', ()=>{
    if (!isAutoPlaying) {
        autoPlayButtonElem.innerHTML = 'Stop Play'
        guessDisplay.innerHTML = 'Oops! This feature is not available right now.'
        autoPlayIntervalId = setInterval(() => {
            let autoPlayCode = generateSecretCode();
            console.log(autoPlayCode, ComputerSecretCode)
        }, 1000);
        isAutoPlaying = true;
    } else {
        autoPlayButtonElem.innerHTML = 'AutoPlay';
        guessDisplay.innerHTML = ''
        clearInterval(autoPlayIntervalId)
        isAutoPlaying = false;
    }
})


function removeAnimation () {
    replayElem.classList.remove('display-animation');
    displayRemark.classList.remove('display-animation');
}
