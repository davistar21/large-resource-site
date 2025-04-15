const questionContainer = document.getElementById("question");
const answersContainer = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let questions = [];

async function fetchQuestions() {
  const res = await fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple");
  const data = await res.json();
  questions = data.results;
  showQuestion();
}

function showQuestion() {
  resetState();
  const question = questions[currentQuestionIndex];
  questionContainer.innerHTML = decodeHTML(question.question);

  let answers = [...question.incorrect_answers];
  answers.splice(Math.floor(Math.random() * 4), 0, question.correct_answer);

  answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.innerText = decodeHTML(answer);
    btn.classList.add("answer-btn");
    btn.onclick = () => selectAnswer(btn, question.correct_answer);
    answersContainer.appendChild(btn);
  });
}

function resetState() {
  answersContainer.innerHTML = "";
  nextBtn.style.display = "none";
}

function selectAnswer(selectedBtn, correctAnswer) {
  const buttons = document.querySelectorAll(".answer-btn");
  buttons.forEach(btn => {
    if (btn.innerText === decodeHTML(correctAnswer)) {
      btn.style.backgroundColor = "green";
    } else {
      btn.style.backgroundColor = "red";
    }
    btn.disabled = true;
  });
  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    questionContainer.innerHTML = "Quiz finished!";
    answersContainer.innerHTML = "";
    nextBtn.style.display = "none";
  }
});

function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

fetchQuestions();
