let name = document.getElementById('name')
let weight = document.getElementById('weight')
let height = document.getElementById('height')
let weightUnit = document.getElementById('weightUnit').value
let heightUnit = document.getElementById('heightUnit').value
let bmiButton = document.getElementById('bmi-button')

function calculateBMI() {
    let heightInMeters, weightInKg;
    weight = parseFloat(weight.value)
    height = parseFloat(height.value)
    if (weightUnit === 'lb') {
        weightInKg = weight * 0.453592;
    } else {
        weightInKg = weight;
    }
    if (heightUnit === 'cm') {
        heightInMeters = height / 100;
    } else{
        heightInMeters = height;
    }
    const bmi = weightInKg / ((heightInMeters) ** 2);
    let category = '';
    if (bmi < 18.5) {
        category = 'You are underweight';
      } else if (bmi < 24.9) {
        category = "That is normal";
      } else if (bmi < 29.9) {
        category = 'You are overweight';
      } else {
        category = 'You are obese';
      }
      return `${category}, ${name.value}`
}
bmiButton.addEventListener('click', ()=>(
    document.querySelector('.js-display-bmi-result').innerHTML = calculateBMI()
))