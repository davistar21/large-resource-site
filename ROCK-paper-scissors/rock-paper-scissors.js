let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};
document.querySelector('.popup').classList.add('remove-display');
/*if (!score) {           /*score === null (not score
    score = {
        wins: 0,
        losses: 0,
        ties: 0
    }; } */

updateScoreElem()
function pickComputerMove () {
    const randomNumber = Math.random();
    let computerMove = '';


    if (randomNumber >= 0 && randomNumber < 1/3) {
        computerMove = 'rock';
    } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
        computerMove = 'paper';
    } else {
        computerMove = 'scissors';
    }
    
    return computerMove;                                    /* return gets a value out of a function */
 }
function updateScoreElem() {
    document.querySelector('.js-score').innerHTML = 
    `Wins: ${score.wins} | Ties: ${score.ties} | Losses: ${score.losses}.`
}
let isAutoPlaying = false;
let intervalId;
let autoPlayButtonElem = document.querySelector('.autoplay-button');
function autoPlay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove)
        }, 1000);
        autoPlayButtonElem.innerHTML = 'Stop Play';
        autoPlayButtonElem.classList.add('white-button')
        isAutoPlaying = true;
        document.querySelectorAll('.move-button').forEach(button=>{
            button.disabled = true;
        })
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
        autoPlayButtonElem.innerHTML = 'Auto Play';
        autoPlayButtonElem.classList.remove('white-button')
        document.querySelectorAll('.move-button').forEach(button=>{
            button.disabled = false;
        })
    }
}
//adding the event listeners here
document.querySelector('.js-rock-button').addEventListener('click', () => {
    playGame('rock')
})
document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGame('paper')
})
document.querySelector('.js-scissors-button').addEventListener('click', () => {
    playGame('scissors')
})
document.querySelector('.reset-button').addEventListener('click', () => {
    document.querySelector('.popup').classList.remove('remove-display');
    document.querySelector('.js-the-whole-page-really').classList.add('the-whole-page-really');
    document.querySelector('.popup').innerHTML = `<div>
    <div>
        Are you sure you want to reset score?
    </div>
    <div>
        <button class='yes-reset-button'>Yes</button>
        <button class='no-reset-button'>No</button>
    </div>
    </div>`
    document.querySelector('.yes-reset-button').addEventListener('click', ()=> {
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        localStorage.removeItem('score');
        updateScoreElem()
        document.querySelector('.popup').classList.add('remove-display')
        document.querySelector('.js-the-whole-page-really').classList.remove('the-whole-page-really');
    },
    document.querySelector('.no-reset-button').addEventListener('click', () => {
        document.querySelector('.popup').classList.add('remove-display')
        document.querySelector('.js-the-whole-page-really').classList.remove('the-whole-page-really')
    }),
)   
    
})

document.querySelector('.autoplay-button').addEventListener('click', () => {
    autoPlay()
})

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock')
    } else if (event.key === 'p') {
        playGame('paper')
    } else if (event.key === 's') {
        playGame('scissors')
    } else if (event.key === 'a') {
        autoPlay()
    } else if (event.key === 'Backspace') {
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        localStorage.removeItem('score');
        updateScoreElem()
    } else if (event.key === 'k'){
        keyboardShortcuts()
    }
})
function playGame (playerMove) {
    const computerMove = pickComputerMove();


    let result = '';
    if (playerMove === 'scissors') {

        //playerMove = document.querySelector('.js-scissors-button').innerHTML;
        if (computerMove === 'rock') {
            result = 'LOSER!';
        }
        else if (computerMove === 'paper') {
            result = 'WINNER!';
        }
        else if (computerMove === 'scissors') {
            result = 'TIE!';
        }
    }
    else if (playerMove === 'paper') {
        //playerMove = document.querySelector('.js-paper-button').innerHTML;
        if (computerMove === 'rock') {
            result = 'WINNER!';
        }
        else if (computerMove === 'paper') {
            result = 'TIE!';
        }
        else if (computerMove === 'scissors') {
            result = 'LOSER!';
        }
    }
    else if (playerMove === 'rock') {
       // playerMove = document.querySelector('.js-rock-button').innerHTML;
        if (computerMove === 'rock') {
            result = 'TIE!';
        }
        else if (computerMove === 'paper') {
            result = 'LOSER!';
        }
        else if (computerMove === 'scissors') {
            result = 'WINNER!';
        }
        
    }            
    if (result === 'WINNER!') {
        score.wins += 1;
    } else if( result === 'LOSER!') {
        score.losses += 1;
    } else if (result === 'TIE!') {
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElem()
    
    
    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `You: <img src="./images/${playerMove}-emoji.png" alt="">  | Computer: <img src="./images/${computerMove}-emoji.png" alt="">`;


       // alert(`You picked ${playerMove} The computer picked ${computerMove}! ${result}! 
//Wins: ${score.wins} | Ties: ${score.ties} | Losses: ${score.losses}.`);
    }
    //null-when we intentionally want something to be empty
    






let keyboardShortcut = document.querySelector('.keyboard-shortcuts')
let classAdded = false;
function keyboardShortcuts () {
    if (!classAdded) {
        keyboardShortcut.innerHTML = `<section class="section-for-keyboard-shortcuts">
                <li>'R' for Rock</li>
                <li>'P' for Paper</li>
                <li>'S' for Scissors</li>
                <li>'Backspace' to Reset Score</li>
                <li>'A' for Toggling AutoPlay On or Off</li>
                <li>'K' for Keyboard Shortcuts </li>
            </section>`
        classAdded = true
    } else {
        keyboardShortcut.innerHTML = 'Keyboard Shortcuts'
        classAdded = false;
    }
}
keyboardShortcut.addEventListener('click', ()=>{
  keyboardShortcuts()  
})