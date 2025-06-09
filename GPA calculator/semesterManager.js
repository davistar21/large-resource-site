import { Semester } from "./semester.js";


export default class SemesterManager{
  constructor() {
    this.#loadFromStorage()
  }
  semesters = [];
  addSemester() {
    this.semesters.forEach(semester => semester.isActive = false)
    this.semesters.push(new Semester(true))
    this.resetId()
    this.saveToStorage()
  }
  calculateCGPA() {
    let CGPA = 0;
    let overallGradePoints = 0;
    this.semesters.forEach(semester => {
      overallGradePoints += semester.getTotalGradePoints()
    })
    CGPA = overallGradePoints/this.overallUnits()
    if (isNaN(CGPA)) {
      return (0).toFixed(2)
    }
    return CGPA.toFixed(2)
  }
  overallUnits() {
    let overallUnits = 0;
    this.semesters.forEach(semester => {
      overallUnits += semester.getTotalUnits() ? semester.getTotalUnits() : 0;
    });
    return overallUnits
  }
  getSemester(id){
    return this.semesters.find((e, index) => index + 1 == id) || []
  };
  resetId() {
    this.semesters.forEach((semester, index) => semester.id = index+1)
  }
  removeSemester(id) {
    this.semesters.splice(id-1, 1);
    this.resetId();
    this.saveToStorage()
  }
  saveToStorage() {
    // localStorage.setItem('semesterManager1', JSON.stringify(this.semesters)) 
  }

  #loadFromStorage() {
    // this.semesters = JSON.parse(localStorage.getItem('semesterManager1')) || []
  };
}
