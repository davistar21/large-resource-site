import handleDarkMode from "../utils/handleDarkMode.js";
import renderGPA from "./utils/renderGPA.js";
import renderTable from "./utils/renderTable.js";
import { getSemesterElem, renderCGPA, renderSemesters, school } from "./utils/renderSemesters.js";
handleDarkMode();
// localStorage.clear()
// school.addSemester()
document.addEventListener('DOMContentLoaded', () => {
  renderSemesters()
});
document.querySelector('.add-semester-button').addEventListener('click', () => {
  school.addSemester()
  renderSemesters()
})
document.querySelector('.add-course-button').addEventListener('click', () => {
  let activeSemester = school.semesters.find(e => e.isActive)
  activeSemester.addCourse()
  renderTable(activeSemester, getSemesterElem(activeSemester.id))
})
document.querySelector('.clear-all-button').addEventListener('click', function () {
  let activeSemester = school.semesters.find(e => e.isActive)
  activeSemester.clearAll();
  renderTable(activeSemester, getSemesterElem(activeSemester.id))
  renderGPA(activeSemester, getSemesterElem(activeSemester.id))
  renderCGPA()
})






