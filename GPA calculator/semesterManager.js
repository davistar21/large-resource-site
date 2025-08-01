import { Semester } from "./semester.js";

export default class SemesterManager{
  constructor() {
    this.#loadFromStorage()
  }
  semesters = [];
  addSemester() {
    this.semesters.forEach(semester => semester.isActive = false)
    this.semesters.push(new Semester(
      this, 
      {
        isActive: true,
        courses: []
      }
    ))
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
    if (this.semesters.length == 1) {
      return  
    }
    if (id == this.semesters.length) {
      this.semesters[this.semesters.length - 2].isActive = true;
    }
    this.semesters.splice(id-1, 1);
    this.resetId();
    this.saveToStorage()
  }
  saveToStorage() {
    const savedSemesters = this.semesters.map(semester => ({
      id: semester.id,
      isActive: semester.isActive,
      courses: semester.courses.map(course => ({
        id: course.id,
        name: course.name,
        units: course.units,
        grade: course.grade
      }))
    }));

    localStorage.setItem('semesterManager1', JSON.stringify(savedSemesters));
  }


  #loadFromStorage() {
    let semestersData =  JSON.parse(localStorage.getItem('semesterManager1')) || []
    if (!semestersData || semestersData.length == 0) {
      this.addSemester();
      return;
    }
    this.semesters = semestersData.map(data => new Semester(this, {
      id: data.id,
      isActive: data.isActive,
      courses: data.courses
    }));
    this.resetId();
  }
}