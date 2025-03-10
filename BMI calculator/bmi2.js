import handleDarkMode from "../utils/handleDarkMode.js";

document.querySelector('.perspective').addEventListener('click', ()=>{
    document.querySelector('.perspective').classList.toggle('active')
})

handleDarkMode()

let playerName = document.getElementById('mortgage-amount')
playerName.focus();
let weightElem = document.getElementById('mortgage-term')
let heightElem = document.getElementById('interest-rate')
let calculateBtn = document.querySelector('.calculate-button')

const radioButtons = document.querySelectorAll('input[name="radio"]');
let selectedValue = 'metric';
function getRadioValue(){
    radioButtons.forEach(button=>{
        button.addEventListener('change', (event)=>{
            if (event.target.checked){
                selectedValue = event.target.value;
            }
        })
    });
    return selectedValue;
}
calculateBtn.classList.add('disabled');
function toggleButtonState(){
    if (weightElem.value.trim() !== '' && heightElem.value.trim() !== '' && playerName.value.trim() !== ''){
        calculateBtn.classList.remove('disabled');
    } else {
        calculateBtn.classList.add('disabled')
    }
}
playerName.addEventListener('input', ()=>{
    toggleButtonState()
})
weightElem.addEventListener('input', ()=>{
    toggleButtonState()
})
heightElem.addEventListener('input', ()=>{
    toggleButtonState()
})
calculateBtn.addEventListener('click', ()=>{
    let selectedUnit = getRadioValue();
    document.querySelector('.perspective').innerHTML = generateResult(selectedUnit);
    resetInput();
    console.log(selectedUnit)
    calculateBtn.classList.add('disabled');
})

let weight, height, displayUnit;
function calculateBMI(selectedUnit){
    let weightInKg, heightInMeters;
    let bmiArray = [];
    weight = parseFloat(document.getElementById('mortgage-term').value);
    height = parseFloat(document.getElementById('interest-rate').value)
    if (selectedUnit === 'imperial'){
        weightInKg = weight * 0.453592;
        heightInMeters = height / 39.344 // 1ft = 0.305m; 12in = 0.305m; 1m = 
   } else if (selectedUnit === 'metric') {
        weightInKg = weight;
        heightInMeters = height 
   }
   const bmi = weightInKg / ((heightInMeters) ** 2);
   let category = '';
   if (bmi < 18.5) {
    category = 'You are underweight';
  } else if (bmi < 24.9) {
    category = "Your weight is normal";
  } else if (bmi < 29.9) {
    category = 'You are overweight';
  } else {
    category = 'You are obese';
  }
  console.log(bmi, category);
  if (isNaN(bmi)){
    return ''
  }
  if (selectedUnit === 'metric'){
    displayUnit = 'kilograms'
  }
  bmiArray.push({bmi: formatValue(bmi),
     height: formatValue(heightInMeters),
      weight: formatValue(weightInKg),
       category, 
        playerName: ((playerName.value).toUpperCase()),
        selectedUnit: displayUnit})
  console.log(bmiArray)
  return bmiArray;
}

function generateResult(selectedUnit) {
    let bmiArray = calculateBMI(selectedUnit)
    let theHtml = `<div class="perspective-inner">
                <div class="actual-result-display">
                    <div>
                      <p>Your BMI</p>
                      <div class="monthly-repayments">${bmiArray[0].bmi}</div>
                    </div>
                    <div class="division-line"></div>
                    <div>
                      <p>Your range</p>
                      <div class="total-repayments">${bmiArray[0].category}, ${bmiArray[0].playerName}</div>
                    </div>
                    <!-- <img src="./assets/images/illustration-empty.svg" alt="">
                    <h2>Results shown here</h2>
                    <p>Complete the form please and click "calculate
                      repayments" if you want to see it.
                    </p> -->
                </div>
                <div class="recommendations">
                    <h2>RECOMMENDATIONS</h2>
                    <p>Since your weight is ${bmiArray[0].weight} ${bmiArray[0].selectedUnit} and your height is ${bmiArray[0].height}m
                        . ${bmiArray[0].category}.
                    </p>
                </div>
            </div>`

    return theHtml 
}
function formatValue(value){
    return value.toFixed(2)
}
function resetInput() {
    playerName.value = ''
    document.getElementById('interest-rate').value = '';
    document.getElementById('mortgage-term').value = '';
    
}
document.getElementById('clear-button').addEventListener('click', ()=>{
    resetInput()
})