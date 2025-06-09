import { Course } from "./course.js";


export class Semester {
  courses = [];
  isActive;
  constructor(isActive) {
    this.isActive = isActive || false;
    // this.#localStorageKey = localStorageKey;
    // this.#loadFromStorage();
  }

  addCourse() {
    this.courses.push(new Course({
      id: this.courses.length,
      name: '',
      units: 0,
      grade: 'A'
    }));
  };

  getCourse(id){
    return this.courses.find(e => e.id == id)
  };
  removeCourse(id) {
    this.courses.splice(id, 1);
    this.resetId()
  }
  resetId() {
    this.courses.map((course, index) => course.id = index)
  }
  calculateGPA() {
    return this.getTotalUnits() ? (this.getTotalGradePoints() / this.getTotalUnits()).toFixed(2) : (0).toFixed(2)
  }

  getTotalGradePoints(){
    let total = 0;
    this.courses.forEach(course => {
      total += course.getWeightedPoint();
      // this.saveToStorage()
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
    this.courses = [];
    // this.saveToStorage()
  }

  // saveToStorage() {
  //   localStorage.setItem(`${this.#localStorageKey}`, JSON.stringify(this.courses)) 
  // }

  // #loadFromStorage() {
  //   this.courses = JSON.parse(localStorage.getItem(`${this.#localStorageKey}`)) || []
  // };
}
