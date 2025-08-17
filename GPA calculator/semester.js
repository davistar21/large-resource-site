import { Course } from "./course.js";


export class Semester {
  id;
  courses = [];
  isActive;
  manager;
  isBlurred;
  constructor(manager, semesterDetails) {
    this.#loadFromStorage();
    this.manager = manager;
    this.isActive = semesterDetails.isActive || false;
    this.isBlurred = semesterDetails.isBlurred || false;
    this.courses = []
    if (semesterDetails.courses && semesterDetails.courses.length > 0) {
      this.courses = semesterDetails.courses.map(course => new Course({
        id: course.id,
        name: course.name,
        units: course.units,
        grade: course.grade
      }));
    } else {
      this.addCourse(); 
    }
  }

  addCourse() {
    this.courses.push(new Course({
      id: this.courses.length,
      name: '',
      units: 0,
      grade: 'A'
    }));
    this.manager.saveToStorage()
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
    this.manager.saveToStorage()
    return this.getTotalUnits() ? (this.getTotalGradePoints() / this.getTotalUnits()).toFixed(2) : (0).toFixed(2)
  }

  getTotalGradePoints(){
    let total = 0;
    this.courses.filter(e => !e.isBlurred).forEach(course => {
      total += course.getWeightedPoint();
    })
    return total
  }

  getTotalUnits() {
    let total = 0
    this.courses.filter(e => !e.isBlurred).forEach(course => {
      total += course.units;
    })
    return total
  }

  clearAll() {
    this.courses = [];
  }
  #loadFromStorage() {
    let data = JSON.parse(localStorage.getItem('semesterManager1')) || [];
    let actualSemester = data ? data.find(e => e.isActive = true) : null;
    if (!actualSemester) return;
    actualSemester.courses.forEach(courseData => {
      this.courses.push(new Course(
        {
          id: courseData.id,
          name: courseData.name,
          units: parseInt(courseData.units),
          grade: courseData.grade,
          isBlurred: courseData.isBlurred
        }
      ))
    })
    this.resetId()
  }
}