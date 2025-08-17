import renderSelectElem from "./renderSelectElem.js";
import renderGPA from "./renderGPA.js";
import { renderCGPA } from "./renderSemesters.js";



export default function renderTable(semester, semesterElem) {
  // if (semester.courses.length === 0) {
  //   semester.addCourse();
  //   renderTable(semester, semesterElem)
  // }
  renderGPA(semester, semesterElem)
  semesterElem.querySelector('tbody').innerHTML = semester.courses.map(course => {
    const isBlurredClass = course.isBlurred ? 'blurred' : '';
    return   `
      <tr data-course-id=${course.id} class="${isBlurredClass}">
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
        <td class="course-action-buttons">
          <i class="fa-solid fa-trash course-delete-button" data-course-id="${course.id}" id="course-delete-button-${course.id}"></i>
          ${
            !course.isBlurred ?
            `<i class="fa-solid fa-eye course-blur-button"></i>` :
            `<i class="fa-solid fa-eye-slash course-blur-button"></i>`
          }
        </td>
      </tr>
    `
}).join('')
  // sem
  //const isBlurredClass = course.isBlurred ? 'blurred' : '';
    semesterElem.querySelectorAll('.course-blur-button').forEach(button => {
      button.addEventListener('click', function (e) {
        const courseId = e.target.closest('tr').dataset.courseId;
        const course = semester.getCourse(courseId);
        course.isBlurred = !course.isBlurred;
        renderTable(semester, semesterElem);
        renderGPA(semester, semesterElem);
        renderCGPA()
      })

    })
  
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

