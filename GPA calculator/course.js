export class Course {
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