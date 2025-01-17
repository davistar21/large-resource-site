// import { guessInformation } from "./data/guess-information.js";
import { toggleMenu } from "./toggleMenu.js";
import { checkPlayerGuess } from "./utils/checkPlayerGuess.js";
import generateSecretCode from "./utils/generateSecretCode.js";
import playGame, { displayChancesLeft } from "./utils/playGame.js";

const comCode = generateSecretCode();
// const guessInputElem = document.querySelectorAll('.guess-input');
const goButtonElem = document.querySelector('.go-button');
const clearButtonElem = document.querySelector('.clear-button')

export let guessInformation;
guessInformation = JSON.parse(localStorage.getItem('guessInformation', guessInformation));
let playerGuessElem = document.querySelector('.player-guess');
document.querySelector('.hamburger').addEventListener('click',()=>{toggleMenu()})

// document.getElementById('1').focus();

let playerGuess = '';
let guessDisplay = document.querySelector(".guess-display-result")

let guessChancesLeft = document.querySelector(".guess-chances-left");
let guessChancesLeftDots = document.querySelector(".chances-left-dots");
let winLoseMessage = document.querySelector(".win-lose-message");
guessChancesLeft.innerHTML = `You have ${guessInformation.totalGuessChances} chances!`
for (let i = 0; i < guessInformation.totalGuessChances; i++ ){
    guessChancesLeftDots.innerHTML += `<button></button>`
}
playerGuessElem.focus();

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
    playerGuessElem.focus();
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
});
playerGuessElem.addEventListener('keydown', (event) =>{
    if (event.key == "Enter") {
        playerGuessElem.focus();
        playerGuess = playerGuessElem.value;
        guessInformation.playerGuess = playerGuess;
        guessInformation.comCode = comCode;
        let displayResult = playGame(()=>{
            winLoseMessage.innerHTML += `<p style="animation: enter-in 0.8s">You Win!</p>`;
        }, ()=>{
            winLoseMessage.innerHTML += `<p>You Lose!</p>`
        }, () => {
            console.log("EndGame function is working")
            playerGuessElem.disabled = true;
            winLoseMessage.innerHTML += `
                <div>The secret code is ${guessInformation.comCode}</div>    
                <div class="icon-div">
                    <button class="restart-button icon-button" id="restart-button">&rarr;</button> <!-- Hint -->
                    <span class="icon-text" >Restart</span>
                </div>`
                winLoseMessage.classList.add("win-lose-animation")
                console.log(winLoseMessage)

            });
        


        guessDisplay.innerHTML += displayResult;
        document.querySelector(".guess-chances").innerHTML = displayChancesLeft();
        playerGuessElem.value = '';
        goButtonElem.disabled = true;
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
    playerGuessElem.focus();
    playerGuess = playerGuessElem.value;
    guessInformation.playerGuess = playerGuess;
    guessInformation.comCode = comCode;
    let displayResult = playGame(()=>{
        winLoseMessage.innerHTML += `<p style="animation: enter-in 0.8s">You Win!</p>`;
    }, ()=>{
        winLoseMessage.innerHTML += `<p>You Lose!</p>`
    }, () => {
        console.log("EndGame function is working")
        playerGuessElem.disabled = true;
        winLoseMessage.innerHTML += `
            <div>The secret code is ${guessInformation.comCode}</div>    
            <div class="icon-div">
                <button class="restart-button icon-button" id="restart-button">&rarr;</button> <!-- Hint -->
                <span class="icon-text" >Restart</span>
            </div>`
            winLoseMessage.classList.add("win-lose-animation")
            console.log(winLoseMessage)

        });
    


    guessDisplay.innerHTML += displayResult;
    document.querySelector(".guess-chances").innerHTML = displayChancesLeft();
    playerGuessElem.value = '';
    goButtonElem.disabled = true;
    clearButtonElem.disabled = true;
    
});
// console.log(guessInformation)

function resetGame(){
    goButtonElem.disabled = false;
    clearButtonElem.disabled = false;
    playerGuessElem.value = ''
}

