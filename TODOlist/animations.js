const bR1 = document.querySelector('.ball-row')
const bR2 = document.querySelector('.ball-row-2')
const bR3 = document.querySelector('.ball-row-3')
bR1.querySelectorAll('.ball').forEach((ball, index) => {
  ball.style.animationDelay = `${index/10}s`
})
bR2.querySelectorAll('.ball').forEach((ball, index) => {
  ball.style.animationDelay = `${index/10}s`
})
bR3.querySelectorAll('.ball').forEach((ball, index) => {
  ball.style.animationDelay = `${index/10}s`
})