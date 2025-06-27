import { abc, words } from "./data/words.js";
import { handleDarkMode } from "./utils/dark-mode.js";
import { shuffleArray } from "./utils/shuffle-array.js";

handleDarkMode();

class Word {
  constructor(props) {
    this.word = props.word
    this.hint = props.hint
    this.availableLetters = this.generateLetters();
    this.chosenLetters = []
    this.#loadFromStorage()
  }
  getFirstLetter() {
    return [...this.word][0];
  }
  getRandomLetter() {
    const index = randomNumberGenerator(this.word.length)
    const randomLetter = [...this.word][index];
    this.availableLetters.splice(index, 1)
    return randomLetter
  }
  generateLetters() {
    let arr = [...this.word];
    for (let i = 0; i < (this.word.length)/2; i++){
      arr.push(abc[Math.floor(Math.random() * abc.length)])
    }
    return shuffleArray(arr)
  }
  findLetter(letter) {
    return [...this.word].find(e => e == letter);
  }
  pickLetter(letter) {
    this.chosenLetters.push(letter);
    this.availableLetters.splice(this.availableLetters.indexOf(letter), 1)
  }
  unPickLetter(letter) {
    this.chosenLetters.splice(this.chosenLetters.indexOf(letter), 1);
    this.availableLetters.push(letter)
  }
  fillArray() {
    const arr = [...this.chosenLetters];
    const rem = this.word.length - arr.length;
    if (rem > 0) {
      for (let i = 0; i < rem; i++){
        arr.push('\ ')
      }
    }
    return arr
  }
  setId() {

  }
  check() {
    if ([...this.word].length !== this.chosenLetters.length) return false;
    return [...this.word].every((element, index) => element === this.chosenLetters[index])
  }
  updateScore() {
    this.score += 10;
    this.saveToStorage()
  }
  saveToStorage() {
    localStorage.setItem('score', JSON.stringify(this.score)) 
  }
  #loadFromStorage () {
    this.score = JSON.parse(localStorage.getItem('score')) || 0;
  }
}

function randomNumberGenerator(limit=100) {
  return Math.floor((Math.random())*limit)
}


class WordManager{
  constructor (words) {
    this.#loadFromStorage()
    this.words = words;
  }
  getRandomWord() {
    return (this.words[Math.floor(Math.random() * words.length)])
  }
  #loadFromStorage() {
    this.score = JSON.parse(localStorage.getItem('score')) || 0;
  }
}


let wordManager = new WordManager([])
console.log(wordManager)
words.forEach(word => {
  wordManager.words.push(new Word({
    word: word.word,
    hint: word.hint
  }))
})


let randomWordClass;
function display() {
  randomWordClass = wordManager.getRandomWord()
  renderAvailableLetters()
}

display()
// document.querySelector('.score').innerHTML = wordManager.score;


function renderAvailableLetters() {
  document.querySelector('.hint').innerHTML = `Hint: ${randomWordClass.hint}`
  document.querySelector('.letters').innerHTML = randomWordClass.availableLetters.map(letter => {
    return `
      <span data-letter=${letter}>${letter}</span>
    `
  }).join('');
  renderChosenLetters()

  document.querySelectorAll('.letters span').forEach(span => {
    if (randomWordClass.chosenLetters.length < randomWordClass.word.length) {
      span.addEventListener('click', () => {
        let letter = span.dataset.letter; 
        randomWordClass.pickLetter(letter);
        if (randomWordClass.check()){
          // randomWordClass.updateScore()
          // console.log(randomWordClass.score, randomWordClass)
          // document.querySelector('.score').innerHTML = wordManager.score;
          document.querySelectorAll('.empty-boxes span').forEach(span => {
            console.log(span)
            // span.style = 'background-color: red; transform:scale(200)'
            span.classList.add('checked')
          })
          setTimeout(() => {
            document.querySelectorAll('.empty-boxes span').forEach(span => {
              // span.classList.remove('correct-checked')
            })
            // display()
          }, 1000);
        }
        renderAvailableLetters();
        renderChosenLetters()
      })
    }
    
  })
}



function renderChosenLetters() {
  document.querySelector('.empty-boxes').innerHTML = randomWordClass.fillArray().map(letter => {
    return `
      <span data-letter=${letter}>${letter}</span>
    `
  }).join('')

  document.querySelectorAll('.empty-boxes span').forEach(span => {
    if (span.innerHTML != '\ ') {
      span.addEventListener('click', function () {
        randomWordClass.unPickLetter(span.innerHTML)
        renderAvailableLetters()
      })
    }
  })
}




