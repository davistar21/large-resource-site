// import getRadioValue from "../utils/getRadioButtons.js";
import formatCurrency from "../utils/formatCurrency.js";
import handleDarkMode from "../utils/handleDarkMode.js";

const tipForm = document.getElementById('tip-form');

let bill = tipForm.querySelector('#bill');
let numberOfPeople = tipForm.querySelector('#number-of-people');
let tipAmount = document.querySelector('#tip-amount');
let totalAmount = document.querySelector('#total-amount')

const tipButtons = tipForm.querySelectorAll('input[name="tip"]');
let tip = 0;
tipButtons.forEach(button => {
  if (button.value !== 'custom') {
    if (button.checked) {
      tip = button.value
    };
    button.addEventListener('change', (e) => {
      if (e.target.checked) {
        tip = e.target.value
      }
    })
  } else {
    button.addEventListener('click', () => 
      {
    })
  }
})
tipForm.addEventListener('change', (e) => {
  const calculatedTip = calculateTip(parseFloat(bill.value), parseFloat(tip));
  tipAmount.innerHTML = (displayTips(calculatedTip, bill.value, numberOfPeople.value))[0]
  totalAmount.innerHTML = (displayTips(calculatedTip, bill.value, numberOfPeople.value))[1]
})

function displayTips (calculatedTip, bill, numberOfPeople) {
  if (isNaN(numberOfPeople) || isNaN(bill) || isNaN(calculatedTip)) {
    console.log('Value is not a number')
    return ['$0.00', '$0.00']
  }
  if (numberOfPeople === '') {
    return ['$0.00', '$0.00']
  }
  let tipAmount, totalAmount, arr = [];
  tipAmount = `$${formatCurrency(parseFloat(calculatedTip)/parseFloat(numberOfPeople))}`
  totalAmount = `$${formatCurrency(parseFloat(bill)/parseFloat(numberOfPeople))}`;
  arr.push(tipAmount, totalAmount);
  console.log(arr)
  return arr
}

function calculateTip(fullAmount, tipPercentage) {
 return ((tipPercentage)/100)*fullAmount;
}
document.querySelector('.reset-button').addEventListener('click', () => {
  tipAmount.innerHTML = displayTips(0, 0, '')[0];
  totalAmount.innerHTML = displayTips(0, 0, '')[1];
  bill.value = '';
  numberOfPeople.value = '';
})

handleDarkMode()