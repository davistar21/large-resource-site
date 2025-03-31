import $ from '../utils/querySelector.js'
const circle = document.getElementById('progressCircle');
const dashoffset = 440 - (440 * 10) / 100; // 440 is full circumference
circle.style.strokeDashoffset = dashoffset;


const addButtonElem = $('.add-button');
const scoreData = $('.score-data');
addButtonElem.addEventListener('click', () => {
  regenerate();
  console.log(scoreData)
})
let length = 0;
function regenerate() {
  $('.each', scoreData,  true).forEach((each, index) => {
    each.classList.remove('slide-down');
    length = index+2
  });
  // length += $('span', scoreData, true).length;
  scoreData.innerHTML += `
    <div class="each" id="each-${length}">
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
    </div>
  `
  $(`#each-${length}`, scoreData).classList.add('slide-down');
  deleteOne();
}

function deleteOne () {
  $('.delete-button', scoreData, true).forEach(button => {
    button.addEventListener('click', () => {
      const objectId = button.dataset.objectId;
      console.log($(`#each-${objectId}`, scoreData))
      $(`#each-${objectId}`, scoreData).remove();

      $('.each', scoreData,  true).forEach((each, index) => {
        each.querySelector('span').innerHTML = index+1;
      });
    })
  })
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

// function calculateGPA() {
//   $('.each', scoreData, true).forEach(each => {
//     console.log(each)
//   })
// }

// calculateGPA()