class Course {
  constructor(courseDetails) {
    this.id = courseDetails.id;
    this.name = courseDetails.name;
    this.units = parseInt(courseDetails.units);
    this.grade = courseDetails.grade;
  }

  getGradePoint() {
    const gradeMap = {
      A: 5,
      B: 4,
      C: 3,
      D: 2,
      E: 1,
      F: 0
    };
    return gradeMap[this.grade.toUpperCase()] ?? 5;
  }
    getWeightedPoint() {
      return this.getGradePoint() * this.units;
    }
}


class Semester {
  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }
  #localStorageKey;

  addCourse(course) {
    this.courses.push(course);
    this.saveToStorage()
  };

  getCourse(id){
    return this.courses.find(e => e.id == id)
  };

  calculateGPA() {
    let totalUnits = 0;
    let totalGradePoints = 0;
    this.courses.forEach(course => {
      totalUnits += course.units;
      totalGradePoints += course.getWeightedPoint();
    });
    return totalUnits ? (totalGradePoints / totalUnits).toFixed(2) : 0;
  }

  getTotalGradePoints(){
    let total = 0;
    this.courses.forEach(course => {
      total += course.getWeightedPoint();
    })
    return total
  }

  getTotalUnits() {
    let total = 0
    this.courses.forEach(course => {
      total += course.units;
    })
    return total
  }

  clearAll() {
    this.courses = [{
      id: 0,
      name: '',
      units: 0,
      grade: ''
    }];
    this.saveToStorage()
  }

  saveToStorage() {
    localStorage.setItem(`${this.#localStorageKey}`, JSON.stringify(this.courses)) 
  }

  #loadFromStorage() {
    this.courses = JSON.parse(localStorage.getItem(`${this.#localStorageKey}`)) || []
  };
}


// localStorage.setItem(`semester1`, JSON.stringify([])) 
const semester1 = new Semester('semester1');
renderTable(semester1);
document.querySelector('.add-course-button').addEventListener('click', () => {
  addCourse(semester1)
})
function addCourse(semester) {
  const newCourse = new Course({
    id: semester.courses.length,
    name: '',
    grade: '',
    units: 0
  });
  semester.addCourse(newCourse)
  console.log(semester.courses)
  renderTable(semester)
}

function renderTable(semester) {
  console.log('This is: ', semester.courses)
  document.querySelector('tbody').innerHTML = semester.courses.map(course => 
    `
      <tr data-course-id=${course.id}>
        <td>
          <input type="text" placeholder="GEG311" class="course-name" value="${course.name || ''}">
        </td>
        <td>
            <select id="grade" class="grade-selector" value="${course.grade || 'A'}">
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
            </select>
        </td>
        <td>
          <input type="number" placeholder="3" class="course-units" value="${course.units || ''}">
        </td>
        <td>
          <button class="delete-button">&times;</button>
        </td>
      </tr>
     
    `
  )
  
  document.querySelectorAll('.course-name').forEach(e => {
    e.addEventListener('input', function (f) {
      let course = semester.getCourse(f.target.closest('tr').dataset.courseId);
      console.log(course)
      course.name = f.target.value
      console.log(course)
      renderGPA(semester)
    })
  })

  document.querySelectorAll('.course-units').forEach(e => {
    e.addEventListener('input', function (f) {
      let course = semester.getCourse(f.target.closest('tr').dataset.courseId);
      course.units = parseInt(f.target.value)
      console.log(course)
      // course.units = f.target.value;
      // console.log(course)
      renderGPA(semester)
    })
  })
  document.querySelectorAll('.grade-selector').forEach(e => {
    e.addEventListener('change', function (f) {
      let course = semester.getCourse(f.target.closest('tr').dataset.courseId);
      console.log(course)
      course.grade = f.target.value
      renderGPA(semester)
      console.log(e.value)
    })
  });
} 

function renderGPA(semester) {
  document.querySelector('tfoot').innerHTML = `
    <tr>
      <td colspan="2">Total Units</td>
      <td>${semester.getTotalUnits()}</td>
    </tr>
    <tr>
      <td colspan="2">Total Grade Points</td>
      <td>${semester.getTotalGradePoints()}</td>
    </tr>
    <tr>
      <td colspan="2">GPA</td>
      <td>${semester.calculateGPA()}</td>
    </tr>
  `
}


document.querySelector('.clear-all-button').addEventListener('click', () => {
  semester1.clearAll();
  renderTable(semester1)
  renderGPA(semester1)
})

// localStorage.clear() // Uncomment this line to clear localStorage for testing purposes
document.addEventListener('DOMContentLoaded', () => {
  renderTable(semester1);
  renderGPA(semester1);
});