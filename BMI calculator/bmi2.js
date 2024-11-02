document.querySelector('.perspective').addEventListener('click', ()=>{
    document.querySelector('.perspective').classList.toggle('active')
})
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
    // calculateBtn.classList.add('disabled');
})

function calculateBMI(selectedUnit){
    let weightInKg, heightInMeters;
    let bmiArray = [];
    weight = parseFloat(document.getElementById('mortgage-term').value);
    height = parseFloat(document.getElementById('interest-rate').value)
    if (selectedUnit === 'imperial'){
        weightInKg = weight * 0.453592;
        heightInMeters = height * 0.308
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
  bmiArray.push((bmi.toFixed(2)), category, ((playerName.value).toUpperCase()))
  console.log(bmiArray)
  return bmiArray;
}

function generateResult(selectedUnit) {
    let bmiArray = calculateBMI(selectedUnit)
    let theHtml = `<div class="perspective-inner">
                <div class="actual-result-display">
                    <div>
                      <p>Your BMI</p>
                      <div class="monthly-repayments">${bmiArray[0]}</div>
                    </div>
                    <div class="division-line"></div>
                    <div>
                      <p>Your range</p>
                      <div class="total-repayments">${bmiArray[1]}, ${bmiArray[2]}</div>
                    </div>
                    <!-- <img src="./assets/images/illustration-empty.svg" alt="">
                    <h2>Results shown here</h2>
                    <p>Complete the form please and click "calculate
                      repayments" if you want to see it.
                    </p> -->
                </div>
                <div class="recommendations">
                    <h2>RECOMMENDATIONS</h2>
                    <p>Since your weight is ${bmiArray[0]} kilograms and your height is 180cm
                        . That is a normal weight.
                    </p>
                </div>
            </div>`

    return theHtml 
}
function resetInput() {
    playerName.innerHTML = ''
    document.getElementById('interest-rate').value = '';
    document.getElementById('mortgage-term').value = '';
    
}