document.body.style = `height: ${window.innerHeight}px;`
const questionDiv = document.querySelector('.quiz-section')
const checkAnswer = (x, y) => x == y;

const randomNumberGenerator = (end=100) => {
  const randomNumber = parseInt((Math.random())*end)
  return randomNumber
}
let correctAnswer;
function generateQuestion() {
  const a = randomNumberGenerator();
  const b = randomNumberGenerator();
  correctAnswer = a + b;
  const upperLimit = correctAnswer + 5;
  const lowerLimit = correctAnswer - 5;
  const options = new Set();
  options.add(correctAnswer)
  while (true) {
    let g = randomNumberGenerator(upperLimit);
    if (g > lowerLimit ) {
      options.add(g)
      if (options.size > 3) {
        break
      }
    } 
  }
  console.log(correctAnswer, options)
  
  const generateOptions = ()   => {
    let g = '';
    [...options].forEach(option => {
      let r = `<span class="option">${option}</span>`
      g += r
    })
    return g
  }
  
  return `
    <div class="question">
      <span>${a}</span>+<span>${b}</span>=<span>?</span>
    </div>
    <div class="options">
      ${generateOptions()}
    </div>
  `
}
console.log(checkAnswer(2, 2))

questionDiv.innerHTML = generateQuestion()


document.querySelector('.options').querySelectorAll('span').forEach(option => {
  option.addEventListener('click', () => {
    console.log(checkAnswer(parseInt(option.innerHTML), correctAnswer));
    questionDiv.innerHTML = generateQuestion();
  })
})
