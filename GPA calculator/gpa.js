import handleDarkMode from "../utils/handleDarkMode.js"
import $ from '../utils/querySelector.js'

handleDarkMode();


let gpa = 3.5 ;
let jg = (gpa/5)*4400;

const circle = document.getElementById('progressCircle');
const dashoffset = 440 - (jg * 10) / 100; // 440 is full circumference
circle.style.strokeDashoffset = dashoffset;


// $('.start-button').classList.add('disabled');
// $('#entry-form-input').focus()

$('#entry-form-input').addEventListener('input', (e) => {
  if (parseInt(e.target.value) >=4 && parseInt(e.target.value) <= 15){
    $('.start-button').classList.remove('disabled')
  } else {
    $('.start-button').classList.add('disabled')
  }
})
$('#entry-form-input').addEventListener('keydown', (e) => {
  if (e.key == 'Enter' && parseInt(e.target.value) >=4 && parseInt(e.target.value) <= 15) {
    $('.entry-form').classList.add('float')
    $('.main-article').classList.add('slide-up');
    $('.start-button').classList.add('disabled')
    const n = parseInt($('#entry-form-input').value)
    $('.course-table').innerHTML = display(n)      
  }
})

$('.start-button').addEventListener('click', () => {
  $('.entry-form').classList.add('float')
  $('.main-article').classList.add('slide-up');
  $('.start-button').classList.add('disabled')
  const n = parseInt($('#entry-form-input').value)
  $('.course-table').innerHTML = display(n)




  $('.course-table').querySelectorAll('form').forEach(course => {
    console.log(course['course-code'])
    course.addEventListener('change', (e) => {
      // console.log(e.target.name, ': ', e.target.value)
      $('.gpa-value').innerHTML = calculateGPA(e.target, parseInt(course['course-units'].value))
      
    })
  })
    
})

let gpaArray = []

function display(n) {
  let str = '';
  for (let i = 1; i < n+1; i++) {
    gpaArray.push({
      id: `course-${i}`,
      gradeValue: 0,
      units: 0
    })
    str += `
      <form class="course" id="course-${i}">
        <span>${i}</span>
        <input type="text" placeholder="GEG311" name="course-code" id="course-code-${i}">
        <select name="course-grade" id="course-grade-${i}">
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
          <option value="F">F</option>
        </select>
        <input type="number" name="course-units" placeholder="e.g. 3" id="course-units-${i}">
        <i class="fa-solid fa-trash delete-button" data-object-id="${i}" id="delete-button-${i}"></i>
      </form>
    `
  }
  return str
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
// function calculateGPA(elems) {
//   gradeMap.forEach(map => {
//     if (map.grade == elems['grade'].value){
//       totalGradePoints += Number(map.gradePoint)
//     }
//   })
//   console.log(totalGradePoints)
// }


function calculateGPA(target, u, cb) {
  let gradeValue = 0, units = 0;
  
  if (!u) u = 0;
  if (target.name == 'course-code') {

  } else if (target.name == 'course-grade') {
    totalGradePoints += parseInt((gradeMap.filter(e => e.grade == target.value))[0].gradePoint) * u;
  } else if (target.name == 'course-units') {
    units = parseInt(target.value)
    totalUnits += units;
  }
  console.log(`
      total Units: ${totalUnits}, \n
      total GradePoints: ${totalGradePoints}, \n
      gpa: ${(totalGradePoints/totalUnits).toFixed(2)}
    `)
  return (totalGradePoints/totalUnits).toFixed(2)
}