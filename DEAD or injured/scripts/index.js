let currentStep = 0;
const steps = document.querySelectorAll('.form-step');
// console.log(steps[steps.length-1])
const nextButton = document.createElement('button')
nextButton.innerHTML = '&next;';
nextButton.classList.add('next-button')
document.querySelector('.user-form').appendChild(nextButton)

nextButton.addEventListener('click', ()=> {
    nextStep(event)
})
let currentElement, nextElement;
function nextStep(event) {
    event.preventDefault();
    let currentElement = steps[currentStep];
    let nextElement = steps[currentStep + 1];
    currentElement.classList.add('leave-to-right')
    setTimeout(()=>{
        currentElement.classList.remove('active')
    }, 1)
    currentStep++
    if (currentStep < steps.length){
        nextElement.classList.add('active','enter-from-left')
        // setTimeout
    }
    if (currentStep == steps.length-1){
        nextButton.style.display = 'none'
    }
}