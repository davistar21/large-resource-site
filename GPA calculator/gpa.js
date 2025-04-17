import handleDarkMode from "../utils/handleDarkMode.js"
import $ from '../utils/querySelector.js'

handleDarkMode();


let gpa = 3.5 ;
let jg = (gpa/5)*4400;


const circle = document.getElementById('progressCircle');
const dashoffset = 440 - (jg * 10) / 100; // 440 is full circumference
circle.style.strokeDashoffset = dashoffset;



const addButtonElem = $('.add-button');
const scoreData = $('.score-data');

$('.clear-all').addEventListener('click', clearAll)
addButtonElem.addEventListener('click', () => {
  regenerate();
  g();
  $('.each', scoreData, true).forEach(form => {
    form.addEventListener('change', (e) => {
      // calculateGPA(e.currentTarget.elements)
    })
  })
})
g()
function g () {
  $('.each', scoreData, true).forEach(form => {
    form.addEventListener('change', (e) => {
      e.preventDefault();
      console.log(form)
      // calculateGPA(e.currentTarget.elements)
    })
  })
  
}



let length = 0;
function regenerate() {
  $('.each', scoreData,  true).forEach((each, index) => {
    each.classList.remove('slide-down');
    length = index+2
  });
  // length += $('span', scoreData, true).length;
  scoreData.innerHTML += `
    <form class="each" id="each-${length}">
      <span>${length}</span>
      <input type="text" placeholder="GEG311">
      <select name="" id="">
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="E">E</option>
        <option value="F">F</option>
      </select>
      <input type="number">
      <i class="fa-solid fa-trash delete-button" data-object-id="${length}" id="delete-button-${length}"></i>
    </form>
  `;
  
  length = $('.each', scoreData, true).length;
  $(`#each-${length}`, scoreData).classList.add('slide-down');
  deleteOne();
}

function deleteOne () {
  $('.delete-button', scoreData, true).forEach(button => {
    button.addEventListener('click', () => {
      const objectId = button.dataset.objectId;
      $(`#each-${objectId}`, scoreData).remove();

      $('.each', scoreData,  true).forEach((each, index) => {
        each.querySelector('span').innerHTML = index+1;
      });
    })
  })
}
function clearAll() {
  scoreData.innerHTML = `
    <form class="each" id="each-1">
      <span>1</span>
      <input type="text" placeholder="GEG311" name="course-code">
      <select name="grade" id="">
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="E">E</option>
        <option value="F">F</option>
      </select>
      <input type="number" name="course-units">
      <i class="fa-solid fa-trash delete-button" data-object-id="1" id="delete-button-1"></i>
    </form>
    `
}

const gradeMap = [
  {
    grade: 'A',
    gradePoint: 5
  },
  {
    grade: 'B',
    gradePoint: 4
  },
  {
    grade: 'C',
    gradePoint: 3
  },
  {
    grade: 'D',
    gradePoint: 2
  },
  {
    grade: 'E',
    gradePoint: 1
  },
  {
    grade: 'F',
    gradePoint: 0
  },
]
let totalUnits = 0;
let totalGradePoints = 0;
function calculateGPA(elems) {
  gradeMap.forEach(map => {
    if (map.grade == elems['grade'].value){
      totalGradePoints += Number(map.gradePoint)
    }
  })
  console.log(totalGradePoints)
}

// calculateGPA()

