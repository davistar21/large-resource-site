import { gameLogic, generateHistory } from "./allFunctionsAndUtils.js";

export const scoreMap = [
//defines the scoreMap array
    {
        letter: 'a',
        scoreValue: 1
    },
    {
        letter: 'b',
        scoreValue: 3
    },
    {
        letter: 'c',
        scoreValue: 3
    },
    {
        letter: 'd',
        scoreValue: 2
    },
    {
        letter: 'e',
        scoreValue: 1
    },
    {
        letter: 'f',
        scoreValue: 4
    },
    {
        letter: 'g',
        scoreValue: 2
    },
    {
        letter: 'h',
        scoreValue: 4
    },
    {
        letter: 'i',
        scoreValue: 1
    },
    {
        letter: 'j',
        scoreValue: 8
    },
    {
        letter: 'k',
        scoreValue: 5
    },
    {
        letter: 'l',
        scoreValue: 1
    },
    {
        letter: 'm',
        scoreValue: 3
    },
    {
        letter: 'n',
        scoreValue: 1
    },
    {
        letter: 'o',
        scoreValue: 1
    },
    {
        letter: 'p',
        scoreValue: 3
    },
    {
        letter: 'q',
        scoreValue: 10
    },
    {
        letter: 'r',
        scoreValue: 1
    },
    {
        letter: 's',
        scoreValue: 1
    },
    {
        letter: 't',
        scoreValue: 1
    },
    {
        letter: 'u',
        scoreValue: 1
    },
    {
        letter: 'v',
        scoreValue: 4
    },
    {
        letter: 'w',
        scoreValue: 4
    },
    {
        letter: 'x',
        scoreValue: 8
    },
    {
        letter: 'y',
        scoreValue: 4
    },
    {
        letter: 'z',
        scoreValue: 10
    }, {
        letter: '\ ',
        scoreValue: 0
    }
]
export let historyArray = [];
historyArray = JSON.parse(localStorage.getItem('historyArray', historyArray));
export let goBtn = document.querySelector('button');
export let resultDiv = document.querySelector('.result')
goBtn.disabled = true;

export let word = document.querySelector('.word-input');

word.addEventListener('input', (e)=>{
    if (e.target.value.length !== 0)  {
        goBtn.disabled = false;
        
    }
})
word.addEventListener('keydown', (event)=> {
    if (event.key === 'Enter'){
        gameLogic()

    }
})

goBtn.addEventListener('click', ()=>{
    gameLogic()
})



export let historyElem = document.querySelector('.history');
// historyArray.forEach(historyObject => {
//     let theHTML = `<div class="history-object-items">${(historyObject.word).toUpperCase()}: <span>${historyObject.score}</span></div>
//     `
//     historyElem.innerHTML += theHTML
// })

generateHistory(historyArray);
document.querySelector('.clear-history').addEventListener('click', ()=>{
    if (historyArray.length !== 0) {
        localStorage.removeItem('historyArray')
        historyArray = [];
        generateHistory(historyArray);
    } else {
        historyElem.innerHTML = 'History has already been cleared!';
        setTimeout(() => {
            historyElem.innerHTML = '';
        }, 1000);
    }
    
})

//get the input word; loop through the input word; loop through the