const numberElem = document.querySelector('#num');
const addButton = document.querySelector('#add');
const checkButton = document.querySelector('#check');
const displayElem = document.querySelector('.display')
let numbers = [];

numberElem.focus()
addButton.addEventListener('click', () => {
  numberElem.focus()
  let span = document.createElement('span');
  span.textContent = Number(numberElem.value)
  numbers.push(Number(numberElem.value))
  span.style = `
    bottom: ${randomNumberGenerator()}%;
    right: ${randomNumberGenerator()}%
  `
  displayElem.appendChild(span);
  numberElem.value = ''
})

checkButton.addEventListener('click', function () {
  console.log(checkLargestNumber(numbers))
})

function randomNumberGenerator(end=100){
  const randomNumber = parseInt((Math.random())*end)
  return String(randomNumber)
}


function checkLargestNumber(arr) {
  let ln = 0;
  arr.forEach(elem => {
    if (elem > ln) {
      ln = elem
    }
  })
  return ln
}
