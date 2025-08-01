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
    const isActiveClass = semester.isActive ? 'active' : '';
    const isBlurredClass = semester.isBlurred ? 'blurred' : '';
    return `
      <h4 data-semester-number="${semester.id}" class="${isActiveClass} ${isBlurredClass}" id="semester-h4-${semester.id}">
        Semester ${semester.id}
        <div style="display: flex; align-items: center; gap: 15px; font-size: 0.8rem; margin-left: 15px;">
          <i class="fa-solid fa-trash semester-delete-button" data-semester-id="${semester.id}" id="semester-delete-button-${semester.id}" ></i>
          ${
            !semester.isBlurred ?
            `<i class="fa-solid fa-eye blur-button data-blur="${semester.isBlurred}""></i>` :
            `<i class="fa-solid fa-eye-slash blur-button data-blur="${semester.isBlurred}"></i>`}
        </div>
  
      </h4>
  `}).join('');
  document.querySelectorAll('.blur-button').forEach(button => {
    button.addEventListener('click', function (e) {
      const semesterId = e.target.closest('h4').dataset.semesterNumber;
      const semester = school.getSemester(semesterId);
      semester.isBlurred = !semester.isBlurred;
    })
  })
  document.querySelectorAll('.semester-delete-button').forEach(button => {
    button.addEventListener('click', function(){
      school.removeSemester(button.dataset.semesterId)
      // school.semesters.forEach(semester => semester.isActive = false)  
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
              <th>Courses (<span class="courses-length">0</span>)</th>
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
  const semesterButtons = document.querySelectorAll('.semesters-div h4');
  const semesterPanes = document.querySelectorAll('.semester-pane')
  school.semesters.forEach(semester => {
    renderTable(semester, getSemesterElem(semester.id));
    renderGPA(semester, getSemesterElem(semester.id));
    renderCGPA()
    if (semester.isActive) {
      // document.querySelector(`#semester-h4-${semester.id}`).classList.add('active')
      document.querySelector(`#semester-${semester.id}`).classList.add('active')
    }
  })
  semesterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const semesterId = button.dataset.semesterNumber;
      activeSemester = school.getSemester(semesterId)
      
      school.semesters.forEach(semester => semester.isActive = false)
      // semesterButtons.forEach(button => {
      //   button.classList.remove('active')
      // })
      // semesterPanes.forEach(pane => {
      //   pane.classList.remove('active')
      // })
      activeSemester.isActive = true;
      // button.classList.add('active')
      
      renderSemesters()
    })
  })
}

