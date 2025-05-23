import handleDarkMode from "../utils/handleDarkMode.js";

const $ = (className, src=document) => src.querySelector(className)
handleDarkMode()
let historyArray = JSON.parse(localStorage.getItem('historyArray')) || [];
function saveHistory() {
    localStorage.setItem('historyArray', JSON.stringify(historyArray))
}
const stringToArray = (string) => {
  let arr = [];
  for (const letter in string) {
    arr.push(string[letter])
  }
  return arr;
}
export const scoreMap = [
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

const wordInput = $('.word-input');
const playBUttonElem = $('.play-button');
let resultDisplay = $('.result')

let scoreValue = 0;

wordInput.focus()
$('form').addEventListener('submit', (e) => e.preventDefault())
wordInput.addEventListener('input', (e) => {
  // showTiles(e.target.value)
})
playBUttonElem.addEventListener('click', () => {
  if (!checkForNumber(wordInput.value)) {
    showTiles(wordInput.value)
  }
  wordInput.value = ''
})
function checkForNumber(word) {
  for (const letter in word) {
    if (!isNaN(parseInt(word[letter]))) {
      return true
    } 
  }
}
function showTiles(word) {
  let displayedTiles = '';
  let displayTotalScore = '';
  let totalScore = 0;
  stringToArray(word).forEach(letter => {
    scoreMap.forEach(score => {
      if (score.letter == letter) {
        scoreValue = score.scoreValue;
        totalScore += scoreValue
      }
    })
    displayTotalScore = `<div>${word}: ${totalScore}</div>`

    displayedTiles += `
      <em class="letter-tile">${letter}
        <span>${scoreValue}</span>
      </em>
    `
    resultDisplay.innerHTML = `${displayTotalScore}<div class="tile-block">${displayedTiles}</div>`
    

    document.querySelectorAll('.letter-tile').forEach(tile => {
      tile.addEventListener('click', () => {

      })
    })
  });
  historyArray.push({
    word,
    totalScore
  });
  saveHistory();
  displayHistory();
}

function displayHistory() {
  $('.history').innerHTML = '<span class="clear-history">✖</span>';
  historyArray.forEach(history => {
    $('.history').innerHTML += `<div class="history-element">${history.word}: ${history.totalScore}</div>`;

  });
  $('.clear-history').addEventListener('click', () => {
    historyArray = [];
    localStorage.removeItem('historyArray');
    displayHistory()
  })
}
displayHistory()

$('.history-button').addEventListener('click', () => {
  $('.history').classList.toggle('active')
})


