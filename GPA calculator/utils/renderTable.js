import renderSelectElem from "./renderSelectElem.js";
import renderGPA from "./renderGPA.js";
import { renderCGPA } from "./renderSemesters.js";



export default function renderTable(semester, semesterElem) {
  // if (semester.courses.length === 0) {
  //   semester.addCourse();
  //   renderTable(semester, semesterElem)
  // }
  semesterElem.querySelector('.courses-length').innerHTML = semester.courses.length
  let theHTML = ''
  semester.courses.forEach(course => 
  theHTML +=   `
      <tr data-course-id=${course.id}>
        <td>
          <input type="text" placeholder="GEG311" class="course-name" value="${course.name || ''}">
        </td>
        <td>
          <select id="grade" class="grade-selector" value="${course.grade || 'A'}">
            ${renderSelectElem(course)}
          </select>
        </td>
        <td>
          <input type="number" placeholder="3"  class="course-units" value="${course.units || ''}">
        </td>
        <td>
          <i class="fa-solid fa-trash course-delete-button" data-course-id="${course.id}" id="course-delete-button-${course.id}"></i>
        </td>
      </tr>
    `
  )
  semesterElem.querySelector('tbody').innerHTML = theHTML;
  
  semesterElem.querySelectorAll('.course-name').forEach(e => {
    e.addEventListener('input', function (f) {
      f.target.value = f.target.value.toUpperCase();
      let course = semester.getCourse(f.target.closest('tr').dataset.courseId);
      course.name = f.target.value
      renderGPA(semester, semesterElem)
    })
  })

  semesterElem.querySelectorAll('.course-units').forEach(e => {
    e.addEventListener('input', function (f) {
      let course = semester.getCourse(f.target.closest('tr').dataset.courseId);
      course.units = Number(f.target.value)
      renderGPA(semester, semesterElem)
      renderCGPA()
    })
  })
  semesterElem.querySelectorAll('.grade-selector').forEach(e => {
    e.addEventListener('change', function (f) {
      let course = semester.getCourse(f.target.closest('tr').dataset.courseId);
      course.grade = f.target.value
      renderGPA(semester, semesterElem)
      renderCGPA()
    })
  });
  semesterElem.querySelectorAll('.course-delete-button').forEach(button => {
    button.addEventListener('click', () => {
      semester.removeCourse(button.dataset.courseId)
      renderTable(semester, semesterElem);
      renderGPA(semester, semesterElem);
      renderCGPA()
    })
  })
} 