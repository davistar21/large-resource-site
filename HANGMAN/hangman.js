import saveToStorage from "../DEAD or injured/scripts/utils/saveToStorage.js";
import { abc, words } from "./data/words.js";
import { handleDarkMode } from "./utils/dark-mode.js";
import { shuffleArray } from "./utils/shuffle-array.js";

handleDarkMode()  
// const circle = document.getElementById('progressCircle');
// const dashoffset = 440 - (440 * 10) / 100; // 440 is full circumference
// circle.style.strokeDashoffset = dashoffset;

document.querySelector('.more-hints-button').addEventListener('click', () => {
  document.querySelector('.action-buttons').classList.toggle('active')
})


let emptyBoxes = document.querySelector('.empty-boxes');
let letterBoxes = document.querySelector('.letters');
let hintElem = document.querySelector('.hint');
let scoreElem = document.querySelector('.score')

const firstLetterBtn = document.querySelector('.first-letter-button');
const randomLetterBtn = document.querySelector('.random-letter-button')

let randomWord, wordAttemptArray = [], letterBoxesSpan

function updateScore() {
  saveToStorage(hscore)
  scoreElem.innerHTML = hscore;
};
function g () {
  randomWord = (words[Math.floor(Math.random() * words.length)]).word
  const arrayOfLetters = [];
  emptyBoxes.innerHTML = '';
  letterBoxes.innerHTML = '';

  for (const letter in randomWord){
    arrayOfLetters.push(randomWord[letter])
  }

  for (let i = 0; i < (randomWord.length)/2; i++){
    arrayOfLetters.push(abc[Math.floor(Math.random() * abc.length)])
  }

  (shuffleArray(arrayOfLetters)).map((letter, index) => {
    letterBoxes.innerHTML += `<span id="f-${index}" data-letter=${letter}>${letter}</span>`
  })

  for (let i = 0; i < randomWord.length; i++){
    emptyBoxes.innerHTML += `<span></span>`
  }

  words.filter((word) => {
    if (word.word == randomWord){
      hintElem.innerHTML = `Hint: ${word.hint}`;
    }
  })

  console.log(letterBoxes, emptyBoxes)

  wordAttemptArray = [];
  function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((element, index) => element === arr2[index])
  }
  letterBoxesSpan = letterBoxes.querySelectorAll('span')

  letterBoxesSpan.forEach(span => {
    span.addEventListener('click', () => {
      const letter = span.dataset.letter;
      wordAttemptArray.push(letter)
      console.log(wordAttemptArray)
      
      console.log(wordAttemptArray, [...randomWord])
  
      display()
  
      if (arraysAreEqual([...randomWord], wordAttemptArray)) {
        // hscore += 10
        // updateScore()
        emptyBoxes.querySelectorAll('span').forEach(box => {
          box.classList.add('checked');
          setTimeout(() => {
            g()
          }, 1500);
        })
      } else if (!arraysAreEqual([...randomWord], wordAttemptArray) && (wordAttemptArray.filter(e => e !== '\ ')).length === [...randomWord].length){
        emptyBoxes.querySelectorAll('span').forEach(box => {
          box.classList.add('wrong-checked');
          setTimeout(()=>{
            wordAttemptArray = [];
            display()
          }, 1000)
        })
      }
      span.style = 'display: none;'
      wordAttemptArray = wordAttemptArray.filter(e => e !== '\ ')
    })
    // wordAttempt =  wordAttempt.padEnd(randomWord.length, '\ ');
  })
  
}

g();

firstLetterBtn.addEventListener('click', () => {
  wordAttemptArray[0] = [...randomWord][0];
  const h = [...letterBoxesSpan].filter(e => e.innerHTML == [...randomWord][0]);
  h[0].style = 'display: none'
  display()
})
function randomNumberGenerator(limit) {
  const randomNumber = Math.floor((Math.random())*limit)
  return randomNumber
}
randomLetterBtn.addEventListener('click', () => {
  const randomLetter = randomWord[randomNumberGenerator(randomWord.length)];
  const l = [...randomWord].indexOf(randomLetter)
  display()
})
function display () {
  const remLettersLength = randomWord.length - wordAttemptArray.length;
    for (let i = 0; i < remLettersLength; i++){
      wordAttemptArray.push('\ ');
    }
  emptyBoxes.innerHTML = ''
  wordAttemptArray.forEach((element, index) => {
    emptyBoxes.innerHTML += `<span id='z-${index}'>${element}</span>`
  })
}

document.querySelector('.replay').addEventListener('click', () => {
  console.log('ll')
  g()
})
// const letterTiles = letterBoxes.querySelectorAll('span');
// letterTiles.forEach(tile => {
//   tile.addEventListener('dragstart', dragStart);
//   tile.addEventListener('dragend', dragEnd)
// })

// const dropZones = emptyBoxes.querySelectorAll('span');
// dropZones.forEach(area => {
//   area.addEventListener('dragover', dragOver)
//   area.addEventListener('dragenter', dragEnter)
//   area.addEventListener('dragleave', dragLeave)
//   area.addEventListener('drop', drop)
// })

// function dragStart (e) {
//   e.dataTransfer.setData('text/plain', e.target.id);
//   setTimeout(() =>{
//     e.target.classList.add('hide');
//   }, 0)
// }
// function dragEnd (e) {
//   e.target.classList.remove('hide');
// }
// function dragOver (e) {
//   e.preventDefault();
// }
// function dragEnter (e) {
//   e.preventDefault();
//   // area.classList.add('hover');
// }
// function dragLeave () {
//   // area.classList.remove('hover');
// }
// function drop (e) {
//   e.preventDefault();
//   // area.classList.remove('hover');

//   const droppedLetterId = e.dataTransfer.getData('text/plain');
//   const droppedLetter = document.getElementById(droppedLetterId);
//   if (droppedLetter) {
//     // e.target.innerHTML = ''; // Clear previous content
//     console.log(e.target.children)
//     e.target.appendChild(droppedLetter); // Move letter to drop area
//     // e.target.innerHTML = droppedLetter.innerHTML
//     // console.log(e.target)
//   }
// }


'docs.google.com/spreadsheets/d/1eS3VRhjgDhWcOD6HCbi3aGTFeCMrFPvwBygPLoHn88w/edit?gid=0#gid=0'