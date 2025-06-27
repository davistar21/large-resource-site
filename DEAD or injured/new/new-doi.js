import { randomNumberGenerator } from "../scripts/utils/generateSecretCode.js"
import randomElement from "../scripts/utils/randomElement.js";

class GuessManager {
  levels = {
    'easy': 15, 
    'medium': 10,
    'hard': 5
  }
  winPhrases = [
    'You Win',
    'Splendid',
    'Excellent',
    'Spectacular effort',
    'Hoorah'
  ]
  chances = this.totalChances
  constructor(level) {
    this.level = level;
    this.totalChances = this.levels[`${this.level}`]
    this.secretCode = this.generateSecretCode()
    this.#loadFromStorage()
  }
  // static isValidGuess(guess) {
  //   const set = new Set();
  //   for (let i = 0; i < [...guess].length; i++) {
  //     set.add([...guess][i])
  //   }
  //   console.log([...guess].length)
  //   if (set.size !== 4 || [...guess].length !== 4) return false;
  //   return true
  // }
  static isValidGuess(guess) {
    if (typeof guess !== 'string' || guess.length !== 4) return false;
    const uniqueChars = new Set(guess);
    return uniqueChars.size === 4;
  }
  
  
  
  // addGuess (guess) {
  //   this.analyze(guess)
  //   this.saveToStorage()
  // }
  generateSecretCode() {
    let s = new Set()
    while (s.size < 4) {
      s.add(randomNumberGenerator())
    }
    return [...s]
  }
  analyze(guess) {
    const gs = new Guess(guess)
    this.guesses.push(gs)
    this.chances = this.totalChances - this.guesses.length
    if (gs.compare(this.secretCode)) {
      // gs.statusObject.dead = 4
      // return gs.statusObject
    }
    if (this.secretCode.length == gs.guess.length) {
      for (const i in this.secretCode) {
        if (this.secretCode[i] == gs.guess[i]) gs.statusObject.dead += 1;
        else if (this.secretCode[i] != gs.statusObject[i] && gs.guess.includes(this.secretCode[i])) gs.statusObject.injured += 1
      }
    }
    if (gs.statusObject.dead == 4) {
      this.gameOver()
    }

    this.saveToStorage()
    return gs.statusObject;
  }
  gameOver() {
    this.guesses = [];
    this.saveToStorage()
    return randomElement(this.winPhrases) + `The secret code was ${this.secretCode}.`
  }
  #loadFromStorage() {
    this.guesses = JSON.parse(localStorage.getItem('guesses')) || []
  }
  saveToStorage() {
    localStorage.setItem('guesses', JSON.stringify(this.guesses))
  }
}
class Guess {
  constructor(guess) {
    this.guess = [...String(guess)]
    this.statusObject = {
      dead: 0,
      injured: 0
    }
  }
  compare(secretCode) {
    if (this.guess.length !== secretCode.length) return false;
    return this.guess.every((element, index) => element === secretCode[index])
  }
}
const gM1 = new GuessManager('hard');

console.log(gM1.secretCode, gM1.chances);


let guessInputElem = document.querySelector('.guess-input');
let goButtonElem = document.querySelector('.go-button');
goButtonElem.classList.add('disabled');

guessInputElem.addEventListener('input', function (e) {
  if (GuessManager.isValidGuess(e.target.value)) {
    goButtonElem.classList.remove('disabled')
  } else {
    goButtonElem.classList.add('disabled')
  }
})

guessInputElem.addEventListener('keydown', function (e) {
  if (e.key == 'Enter' && GuessManager.isValidGuess(e.target.value)) {
    gM1.analyze(guessInputElem.value);
    console.log(gM1.chances)
    renderGuesses()
  } else {
    goButtonElem.classList.add('disabled')
  }
})

goButtonElem.addEventListener('click', function () {
  gM1.analyze(guessInputElem.value);
  console.log(gM1.chances)
  renderGuesses()

  goButtonElem.classList.add('disabled')
})

function renderGuesses() {
  document.querySelector('.a2').innerHTML = gM1.guesses.map(element => {
    return `
      <div>
        <span>${element.guess.map(e => e).join('')}:</span>
        <span>${element.statusObject.dead} dead </span><span>${element.statusObject.injured} injured </span>
      </div>
    `
  }).join('');
  document.querySelector('.chances').innerHTML = gM1.chances
  guessInputElem.value = '';
  guessInputElem.focus()
}

// renderGuesses()


document.querySelector('.set-difficulty').addEventListener('click', function(e) {
  e.target.classList.toggle('active')
})

