let main = document.querySelector('main')
function experiment(n) {
  let total = 0;
  for (let i = 0; i < n; i++) {
    let correct = 0;
    let counter = 0;
    while (counter < 50) {
      let sampleSpace = ['a', 'b'];
      const var1 = sampleSpace[Math.floor(Math.random() * sampleSpace.length)];
      const var2 = sampleSpace[Math.floor(Math.random() * sampleSpace.length)];
      if (var1 === var2) {
        correct++;          
      };
      counter++
      total += correct

    }
  }
  const average = Math.floor(total/n);
  return average
}
function experiment2(n) {
  const sampleSpace = ['a', 'b'];
  let totalCorrect = 0;
  for (let i = 0; i < n; i++) {
    let correctCounter = 0;
    for (let i = 0; i < 100; i++) {
      const var1 = sampleSpace[Math.floor(Math.random() * sampleSpace.length)];
      const var2 = sampleSpace[Math.floor(Math.random() * sampleSpace.length)];
      if (var1 == var2) correctCounter++
    }
    totalCorrect += correctCounter
  }
  return Math.round(totalCorrect/n)
}
for (let i = 0; i < 10; i++) {
  console.log(experiment2(10))
}
class Random {
  static choice(element) {
    return element[Math.floor(Math.random() * element.length)]
  }
  static randint(b, a=0) {
    if (b <= a) throw new Error('Wrong limits');
    if (a < 0 | b < 0) throw new Error('No limit can be less than 0')
    const numbersArray = [];
    let i = a;
    while (i !== b+1) {
      numbersArray.push(a);
      a++
      i++
    }
    return Random.choice(numbersArray)
  }
  static shuffle (elem) {
    for (let i = 0; i < elem.length; i++) {
      let j = Math.floor(Math.random() * elem.length);
      [elem[i], elem[j]] = [elem[j], elem[i]]
    }
    return elem
  }
  static randints(n) {
    let arr = [];
    while (arr.length < n) {
      arr.push(this.randint(9))
    }
    return arr
  }
  static distinctRandints(n) {
    if (n > 9) throw new Error('Cannot return more than 10 distinct digits.')
    let s = new Set()
    while (s.size < n) {
      s.add(this.randint(9))
    }
    return [...s]
  }
}

function conciseExperiment(n) {
  let i = 0
  let totalAcc = 0
  while (i < n) {
    let acc = 0
    for (let i = 0; i < 100; i++) {
      const var1 = Random.choice('ab')
      const var2 = Random.choice('ab')
      if (var1 == var2) acc++
    }
    totalAcc += acc
    i++
  }
  return Math.round(totalAcc/n)
}

console.log('Concise experiment: ', conciseExperiment(100))
console.log(Random.randint(10))
console.log(Random.shuffle([1, 2, 3, 4, 5])) 

// console.log(Random.randints(4), Random.distinctRandints(4))
// main.innerHTML += Random.shuffle([1, 2, 3, 4, 5]).map(e => {
  // return `<span>${e}</span>`
// }).join('')

// main.innerHTML += `<div>${Random.randints(10).join('')}</div><div>${Random.distinctRandints(4).join('')}</div>`
console.log(Random.randints(2))



let questionCount = JSON.parse(localStorage.getItem('questionCount')) | 0;
let correctCounter = JSON.parse(localStorage.getItem('correctCounter')) | 0;
let aCount = JSON.parse(localStorage.getItem('aCount')) | 0;
let bCount = JSON.parse(localStorage.getItem('bCount')) | 0;

render()
function render() {
  localStorage.setItem('correctCounter', JSON.stringify(correctCounter));
  localStorage.setItem('questionCount', JSON.stringify(questionCount))
  document.querySelector('.question-count').innerHTML = questionCount
  document.querySelector('.accuracy').innerHTML = `${((correctCounter/questionCount)*100 || 0).toFixed(2)}%`
  document.querySelectorAll('.value-buttons button').forEach(button => {
    button.classList.remove('wrong')
    button.classList.remove('correct')
  })
  return ((correctCounter/questionCount)*100 || 0).toFixed(2) === '50.00'
}

document.querySelectorAll('.value-buttons button').forEach(button => {
  button.addEventListener('click', () => {
    let correctValue = Random.choice('ab');
    if (button.dataset.value == correctValue) {
      button.classList.add('correct')
      correctCounter++
    } else {
      button.classList.add('wrong')
    }
    setTimeout(() => {
      render()
    }, 200);
    questionCount++
  })
})

let autoPlayIntervalId;
let isAutoPlaying = false;
document.querySelector('.auto-play').addEventListener('click', (e) => {
  if (isAutoPlaying == false) {
    e.target.innerHTML = 'Stop Play'
    isAutoPlaying = true
    autoPlayIntervalId = setInterval(() => {
      const var1 = Random.choice('ab');
      const var2 = Random.choice('ab');
      questionCount++
      if (var1 == var2) {
        correctCounter++
      }
      render()
    }, 10);
  } else {
    e.target.innerHTML = 'Auto Play'
    clearInterval(autoPlayIntervalId)
    isAutoPlaying = false;
  }
})

document.querySelector('.restart').addEventListener('click', () => {
  correctCounter = 0;
  questionCount = 0
  render()
})


const themeIcon = document.getElementById('theme-icon')
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  let isDark = currentTheme === 'dark';
  document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');

  themeIcon.src = isDark
    ? "../images/images/icon-moon.svg"
    : "../images/images/icon-sun.svg";
}

document.documentElement.setAttribute('data-theme', 'light');

themeIcon.addEventListener("click", toggleTheme)

let isAutoPlayingLimit = false;
let n = JSON.parse(localStorage.getItem('n-limit')) || 1;
let limit = 1/n
let autoPlayIntervalLimitId
function renderLimit(){
  localStorage.setItem('n-limit', JSON.stringify(n))
  document.querySelector('.limit').innerHTML = limit.toFixed(10)
  document.querySelector('.n_comp').innerHTML = n
}
renderLimit()
document.querySelector('.auto-play-limit').addEventListener('click', (e) => {
  e.target.innerHTML = isAutoPlayingLimit === false ? 'Stop' : 'Play'
  if (isAutoPlayingLimit == false) {
    autoPlayIntervalLimitId = setInterval(function () {
      limit = 1/n
      renderLimit()    
      n++
    }, 10)

    // e.target.innerHTML = 'Stop';
    isAutoPlayingLimit = true
  } else {
    isAutoPlayingLimit = false;
    clearInterval(autoPlayIntervalLimitId)
    // e.target.innerHTML = 'Play'
  }
})
