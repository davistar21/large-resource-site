import { Semester } from "../semester.js";
import SemesterManager from "../semesterManager.js";
import renderGPA from "./renderGPA.js";
import renderTable from "./renderTable.js";



export const school = new SemesterManager();

export function getSemesterElem(id) {
  return document.querySelector(`#semester-${id}`)
}
export function renderCGPA() {
  const circle = document.getElementById('progressCircle');
  const dashoffset = 440 - (((school.calculateCGPA()/5)*4400) * 10) / 100;
  circle.style.strokeDashoffset = dashoffset;
  document.querySelector('.gpa-value').innerHTML = school.calculateCGPA();
  document.querySelector('.units-total').innerHTML = school.overallUnits()
}
let activeSemester;

export function renderSemesters() {
  document.querySelector('.semesters-div').innerHTML = school.semesters.map(semester => {
    return `
      <h4 data-semester-number="${semester.id}" id="semester-h4-${semester.id}">
        Semester ${semester.id}
        <button style="margin-left:10px" data-semester-id="${semester.id}" id="semester-delete-button-${semester.id}" class="semester-delete-button">
          <!--<i class="fa-solid fa-trash semester-delete-button" data-semester-id="${semester.id}" id="semester-delete-button-${semester.id}"></i>-->
          &times;
        </button>
      </h4>
  `}).join('')
  document.querySelectorAll('.semester-delete-button').forEach(button => {
    button.addEventListener('click', function(){
      school.removeSemester(button.dataset.semesterId)
      // renderSemesters()
    })
  })
  document.querySelector('.semesters-content').innerHTML = school.semesters.map(semester => {
     return `
      <div class="semester-pane" id="semester-${semester.id}">
        <div class="table-header-header">
          <h4>Semester ${semester.id}</h4>
          <h4>Semester GPA: <span class="semester-gpa">${semester.calculateGPA()}</span></h4>
        </div>
        <table>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Grade</th>
              <th>Units (<span class="units">0</span>)</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    ` 
  }).join('');
  school.semesters.forEach(semester => {
    renderTable(semester, getSemesterElem(semester.id));
    renderGPA(semester, getSemesterElem(semester.id));
    renderCGPA()
    if (semester.isActive) {
      document.querySelector(`#semester-h4-${semester.id}`).classList.add('active')
      document.querySelector(`#semester-${semester.id}`).classList.add('active')
    }
  })
  const semesterButtons = document.querySelectorAll('.semesters-div h4');
  const semesterPanes = document.querySelectorAll('.semester-pane')
  semesterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const semesterId = button.dataset.semesterNumber;
      activeSemester = school.getSemester(semesterId)
      
      school.semesters.forEach(semester => semester.isActive = false)
      semesterButtons.forEach(button => {
        button.classList.remove('active')
      })
      semesterPanes.forEach(pane => {
        pane.classList.remove('active')
      })
      activeSemester.isActive = true;
      button.classList.add('active')
      renderSemesters()
    })
  })
}
