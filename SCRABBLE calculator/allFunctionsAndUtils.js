import { historyArray, historyElem, resultDiv, scoreMap } from "./scrabble-calculator.js";

export function generateHistory(array){
    if (array.length == 0){
        historyElem.innerHTML = 'History cleared!';
        setTimeout(() => {
            historyElem.innerHTML = '';
        }, 1000);
    } else {
        array.forEach(historyObject => {
            let theHTML = `<div class="history-object-items">${(historyObject.word).toUpperCase()}: <span>${historyObject.score}</span></div>
            `
            historyElem.innerHTML += theHTML;
        })
    }
}
function generateId () {
    const characters = 'qwertyuiopasdfghjklzxcvbnm';
    const numbers = '1234567890';
    // const specialChar = '!@#$%^&*(){]}[';
    const allChar = characters + numbers
    let IdGenerated = '';
    for (let i = 0; i < 12; i++){
        const randomDeterminant = parseInt((Math.random()) * 36)
        IdGenerated += allChar[randomDeterminant]
    }
    return IdGenerated;
}
let totalScore;
let eventWord;
let caResult;
let gameObjectId;
export function gameLogic () {
    totalScore = 0;
    word.focus();
    historyElem.innerHTML = '';
    let historyObject = {};
    caResult = '';
    if (word.value){
        eventWord = (word.value).toLowerCase();
        for(let i = 0; i < eventWord.length; i++){
            scoreMap.forEach(element => {
                // element.letterId = generateId();
                if (eventWord[i] == element.letter){
                    element.letterId = generateId();
                    console.log(`Found ${element.letter} and its corresponding score value is ${element.scoreValue}`);
                    caResult += `
                    <div class="letter-number-combo" data-game-object-id="${element.letterId}">
                        ${element.letter} 
                        <span>${element.scoreValue}</span>
                        <div class="select-letter-multiplier js-select-letter-multiplier-${element.letterId}" id="${element.letterId}" data-selector-id="${element.letterId}">
                                <button class="double-letter js-select-double-letter-multiplier-${element.letterId}" onclick="console.log('${element.scoreValue}')">&times;2</button>
                                <button class="triple-letter js-select-triple-letter-multiplier-${element.letterId}" onclick="console.log('${element.scoreValue}')">&times;3</button>
                        </div>
                    </div>`
                    // console.log(document.querySelector(`.js-letter-number-combo-${gameObjectId}`))
                    // let letterChoice = document.createElement('p');
                    // letterChoice.textContent = 'Hello world'
                    // .appendChild(letterChoice)
                    totalScore += element.scoreValue;
                }
            })
        }
    }
    historyObject.word = word.value;
    historyObject.score = totalScore;
    historyArray.push(historyObject)
    localStorage.setItem('historyArray', JSON.stringify(historyArray))
    console.log(`The total score is ${totalScore}`)

    resultDiv.innerHTML = generateResult();
    document.querySelectorAll('.letter-number-combo').forEach(combo => {
        combo.addEventListener('mouseover', ()=>{
            const gameObjectId = combo.dataset.gameObjectId;
            console.log(gameObjectId)
            document.querySelector(`.js-select-letter-multiplier-${gameObjectId}`).classList.add('active');
            document.querySelector(`.js-select-double-letter-multiplier-${gameObjectId}`).classList.add('active');
            document.querySelector(`.js-select-triple-letter-multiplier-${gameObjectId}`).classList.add('active')
            // toggleFunctionButtons(document.querySelector(`.js-select-letter-multiplier-${gameObjectId}`))
            // toggleFunctionButtons(document.querySelector(`.js-select-double-letter-multiplier-${gameObjectId}`))
            // toggleFunctionButtons(document.querySelector(`.js-select-triple-letter-multiplier-${gameObjectId}`))
            // console.log(`js-select-letter-multiplier-${gameObjectId}`)
            // toggleFunctionButtons(document.querySelector(`.js-select-letter-multiplier-${gameObjectId}`))
        })
        combo.addEventListener('mouseout', ()=>{
            console.log('hello world')
            const gameObjectId = combo.dataset.gameObjectId;
            document.querySelector(`.js-select-letter-multiplier-${gameObjectId}`).classList.remove('active') ;
            document.querySelector(`.js-select-double-letter-multiplier-${gameObjectId}`).classList.remove('active');
            document.querySelector(`.js-select-triple-letter-multiplier-${gameObjectId}`).classList.remove('active');       })
    })
    document.querySelectorAll('.select-letter-multiplier').forEach(selector =>{
        selector.addEventListener('click', ()=> {
            let selectorId = selector.dataset.selectorId;
            let gameObjectId = selectorId;
            console.log(selectorId);
            console.log(`Thus is it: ${document.querySelector(`.js-select-letter-multiplier-${gameObjectId}`).innerHTML  }`)
        })
    })
    document.querySelector('.event-word-button').addEventListener('click', ()=>{
        toggleFunctionButtons(document.querySelector('.double-word'))
        toggleFunctionButtons(document.querySelector('.triple-word'))
    })
    document.querySelector('.double-word').addEventListener('click', ()=>{
        totalScore = totalScore * 2;
        // document.querySelector('.double-word').classList.remove('active')
        resultDiv.innerHTML = generateResult();

    });
    document.querySelector('.triple-word').addEventListener('click', ()=>{
        totalScore = totalScore * 3;
        resultDiv.innerHTML = generateResult();
    })

    word.value = ''
    generateHistory(historyArray)
}
export function toggleFunctionButtons(button){
    button.classList.toggle('active');
}
function generateResult () {
    let theHTML = `
    <div class="event-word-display">
        <div>${eventWord.toUpperCase()}: ${totalScore}</div>
    </div>
    <div class="event-word-button-holder">
        <button class="event-word-button">i</button>
        <div class="function-buttons">
            <button class="double-word">WORD &times;2</button>
            <button class="triple-word">WORD &times;3</button>
        </div>
    </div>
    <div>${caResult}</div>`
    return theHTML
}
function wordMultiplier(multiplier, number){
    return number * multiplier
}

// let testingP = document.createElement('p')
// testingP.classList = 'q2w3e4r5t5';
// document.body.appendChild(testingP)
// console.log(document.querySelector('.q2w3e4r5t5'))
