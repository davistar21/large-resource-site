export default function renderGPA(semester, semesterElem) {
  semesterElem.querySelector('thead .units').innerHTML = semester.getTotalUnits();
  semesterElem.querySelector('.semester-gpa').innerHTML = semester.calculateGPA();
  semesterElem.querySelector('.courses-length').innerHTML = semester.courses.length
}


