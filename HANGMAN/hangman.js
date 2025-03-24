import { abc, words } from "./data/words.js";
import { handleDarkMode } from "./utils/dark-mode.js";
import { shuffleArray } from "./utils/shuffle-array.js";

handleDarkMode()  
const circle = document.getElementById('progressCircle');
const dashoffset = 440 - (440 * 10) / 100; // 440 is full circumference
circle.style.strokeDashoffset = dashoffset;

document.querySelector('.more-hints-button').addEventListener('click', () => {
  document.querySelector('.action-buttons').classList.toggle('active')
})


let emptyBoxes = document.querySelector('.empty-boxes');
let letterBoxes = document.querySelector('.letters');
let hintElem = document.querySelector('.hint');



const randomWord = (words[Math.floor(Math.random() * words.length)]).word
const arrayOfLetters = [];

for (const letter in randomWord){
  arrayOfLetters.push(randomWord[letter])
}

for (let i = 0; i < (randomWord.length)/2; i++){
  arrayOfLetters.push(abc[Math.floor(Math.random() * abc.length)])
}

(shuffleArray(arrayOfLetters)).map((letter, index) => {
  letterBoxes.innerHTML += `<span draggable="true" class="draggable-letter" id="draggable-letter-${index} ">${letter}</span>`
})

for (let i = 0; i < randomWord.length; i++){
  emptyBoxes.innerHTML += `<span class="drop-zone" id='drop-zone-${i}'></span>`
}

words.filter((word) => {
  if (word.word == randomWord){
    hintElem.innerHTML = `Hint: ${word.hint}`;
  }
})

console.log(letterBoxes, emptyBoxes)
const letterTiles = letterBoxes.querySelectorAll('span');
letterTiles.forEach(tile => {
  tile.addEventListener('dragstart', dragStart);
  tile.addEventListener('dragend', dragEnd)
})

const dropZones = emptyBoxes.querySelectorAll('span');
dropZones.forEach(area => {
  area.addEventListener('dragover', dragOver)
  area.addEventListener('dragenter', dragEnter)
  area.addEventListener('dragleave', dragLeave)
  area.addEventListener('drop', drop)
})

function dragStart (e) {
  e.dataTransfer.setData('text/plain', e.target.id);
  setTimeout(() =>{
    e.target.classList.add('hide');
  }, 0)
}
function dragEnd (e) {
  e.target.classList.remove('hide');
}
function dragOver (e) {
  e.preventDefault();
}
function dragEnter (e) {
  e.preventDefault();
  // area.classList.add('hover');
}
function dragLeave () {
  // area.classList.remove('hover');
}
function drop (e) {
  e.preventDefault();
  // area.classList.remove('hover');

  const droppedLetterId = e.dataTransfer.getData('text/plain');
  const droppedLetter = document.getElementById(droppedLetterId);
  if (droppedLetter) {
    // e.target.innerHTML = ''; // Clear previous content
    console.log(e.target.children)
    e.target.appendChild(droppedLetter); // Move letter to drop area
    // e.target.innerHTML = droppedLetter.innerHTML
    // console.log(e.target)
  }
}



