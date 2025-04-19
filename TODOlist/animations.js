const bR1 = document.querySelector('.ball-row')
const bR2 = document.querySelector('.ball-row-2')
bR1.querySelectorAll('.ball').forEach((ball, index) => {
  ball.style.animationDelay = `${index/10}s`
})
bR2.querySelectorAll('.ball').forEach((ball, index) => {
  ball.style.animationDelay = `${index/10}s`
})

