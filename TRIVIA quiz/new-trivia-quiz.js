import { shuffleArray } from "../HANGMAN/utils/shuffle-array.js";
function randomNumberGenerator (end=100){
  return Math.floor((Math.random())*end)
}
function generateQuestion() {
  const a = randomNumberGenerator();
  const b = randomNumberGenerator();
  let correctAnswer = a+b
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
  return [`${a} + ${b} = `, a+b, shuffleArray([...options])]
}

let questionsArray = [];
for (let i = 0; i < 10; i++) {
  questionsArray.push(generateQuestion())
}

function main() {
  let correct = 0;
  let selectedAnswer = '';
  document.querySelector('.question-div').innerHTML = questionsArray.map((question, index) => {
    return `
    <section id="section-${index}">
      <h2 id="question-${index}">${question[0]}</h2>
      <div class="options">
        ${question[2].map((option, idx) => {
          return `
            <button class="option" id="option-${idx}">${option}</button>
          `
        }).join('')}
      </div>
      <div class="direction-buttons">
        <button class="previous-button" id="previous-button-${index}">&larr;</button>
        <span>Question ${index+1} of ${questionsArray.length}</span>
        <button class="next-button" id="next-button-${index}">&rarr;</button>
      </div>
    </section>
    `
  }).join('')
  document.querySelector('#section-0').classList.add('active');
  document.querySelectorAll('.next-button').forEach(button => {
    button.addEventListener('click', (e) => {
      let sectionId = e.target.closest('section').id;
      let nextSectionId = parseInt(sectionId.slice(sectionId.length-1, sectionId.length)) + 1;
      e.target.closest('section').classList.remove('active');
      document.querySelector(`#section-${nextSectionId}`)?.classList.add('active')
      if (questionsArray.find((e ,idx) => String(idx) == button.id.slice(button.id.length-1, button.id.length))[1] === Number(selectedAnswer)) correct++;
      if (button.id === `next-button-${questionsArray.length-1}`) return displayResults()
    })
  })
  document.querySelectorAll('.previous-button').forEach(button => {
    if (button.id === "previous-button-0") return
    button.addEventListener('click', (e) => {
      let buttonId = e.target.closest('section').id;
      let previousButtonId = parseInt(buttonId.slice(buttonId.length-1, buttonId.length)) - 1;
      e.target.closest('section').classList.remove('active');
      document.querySelector(`#section-${previousButtonId}`)?.classList.add('active')
    })
  })
  document.querySelectorAll('.options button').forEach(button => {
    button.addEventListener('click', (e)=>{
      e.target.closest('div').querySelectorAll('button').forEach(b => {
        if (b.id === button.id) return;
        b.classList.remove('active')
      })
      e.target.classList.toggle('active');
      selectedAnswer = e.target.innerHTML;
      console.log(selectedAnswer)
    })
  })
  function displayResults(){
    console.log('Results displayed');
    let resultElem = document.querySelector('.results');
    resultElem.classList.add('active')
    resultElem.innerHTML = `
      <h2>You scored <span>${correct}</span> out of ${questionsArray.length}</h2>
    `
  }
}
main()

