export default function renderSelectElem(course) {
  let selectedValue = course.grade;
  let grades = ['A', 'B', 'C', 'D', 'E', 'F']
  return grades.map(e => {
    if (e != selectedValue) {
      return `<option value="${e}">${e}</option>`
    }
    return `<option value="${e}" selected>${e}</option>`
  })
}

