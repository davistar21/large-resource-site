const bR1 = document.querySelector('.ball-row')
const bR2 = document.querySelector('.ball-row-2')
const lines = document.querySelector('.lines')
const lines2 = document.querySelector('.lines-2')
const hues = document.querySelector('.hues')
const conic = document.querySelector('.conic')
const call = document.querySelector('.call')
bR1.querySelectorAll('.ball').forEach((ball, index) => {
  ball.style.animationDelay = `${index/10}s`
})
bR2.querySelectorAll('.ball').forEach((ball, index) => {
  ball.style.animationDelay = `${index/10}s`
})
lines.querySelectorAll('div').forEach((line, index) => {
  line.style.animationDelay =  `${index/10}s`
})

const randomNumberGenerator = (end=100) => {
  const randomNumber = parseInt((Math.random())*end)
  return String(randomNumber)
}
const letters = 'abcdefghijklmnopqrstuvwxyz';
const randomLetterGenerator = () => {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  return letters.charAt(Math.floor(Math.random() * letters.length));
}

// setInterval(() => {
//   const x = randomNumberGenerator();
//   const y = randomNumberGenerator()
//   lines.style = `transform: translate(${x}%, ${y}%)`
// }, 1000)

// lines2.querySelectorAll('div').forEach((div, index) => {
//   div.id = index;
//   setInterval(() => {
//     const x = randomNumberGenerator(250);
//     const y = randomNumberGenerator(250);
//     const r = randomNumberGenerator(255);
//     const g = randomNumberGenerator(255);
//     const b = randomNumberGenerator(255);
//     // div.style = `transform: translate(${x}px, ${y}px); background-color: rgb(${r}%, ${g}%, ${b}%)`
//     div.style = `transform: translate(${x}px, ${y}px); background-color: rgb(${r}%, ${g}%, ${b}%)`
//   }, 1000)
// })

// for (let i = 0; i < 256; i++) {
//   let div = document.createElement('div');
//   hues.appendChild(div)
//   for (let j = 0; j < 256; j++) {
//     let pixel = document.createElement('div');
//     pixel.className = 'pixel';
//     pixel.style =  `background-color: rgb(0, ${i}, ${j})`
//     div.appendChild(pixel)
//   }
// }

// setInterval(() => {
//   const x = randomNumberGenerator(250);
//   const y = randomNumberGenerator(250);
//   const r = randomNumberGenerator(255);
//   const g = randomNumberGenerator(255);
//   const b = randomNumberGenerator(255);
//   const m = randomNumberGenerator(100);
//   const n = randomNumberGenerator(100);
//   if (x === 0) x = 1
//   if (y === 0) y = 1
//   conic.style =  `
//     background-color: rgb(${r}, ${g}, ${b}); 
//     height: 20px; 
//     width: 20px;
//     top: ${m}%;
//     left: ${n}%
//   `;
//   lines2.style = `
//     height: ${x}px; 
//     width: ${x}px;
//     top: ${n}%;
//     left: ${m}%
//   `
// }, 1000)
// conic.querySelectorAll('div').forEach((div, index) => {
//   div.id = index;
//   setInterval(() => {
//     const x = randomNumberGenerator(250);
//     const y = randomNumberGenerator(250);
//     const r = randomNumberGenerator(255);
//     const g = randomNumberGenerator(255);
//     const b = randomNumberGenerator(255);
//     div.style = `transform: translate(${x}px, ${y}px); background-color: rgb(${r}%, ${g}%, ${b}%)`
//   }, 1000);
// })

let callBallIntervalId;
let timer = 0;
for (let i = 0; i < 26; i++) {
  let callBall = document.createElement('div');
  callBall.classList.add('call-ball');
  // callBall.textContent = randomLetterGenerator()
  callBall.textContent = letters[i];
  callBall.addEventListener('click', () => {
    callBall.style = `
      transform: translate(${randomNumberGenerator(window.innerWidth)}px, ${randomNumberGenerator(window.innerHeight)}px);
      background-color: rgb(${randomNumberGenerator(255)}%, ${randomNumberGenerator(255)}%, ${randomNumberGenerator(255)}%);
    `
  })
  call.appendChild(callBall);
  callBallIntervalId = setInterval(() => {
    const x = randomNumberGenerator(window.innerWidth);
    const y = randomNumberGenerator(window.innerHeight);
    const r = randomNumberGenerator(255);
    const g = randomNumberGenerator(255);
    const b = randomNumberGenerator(255);
    let f = randomNumberGenerator(100);
    if (f < 40) f = 70;
    callBall.style = `
      transform: translate(${x}px, ${y}px); 
      background-color: rgb(${r}%, ${g}%, ${b}%);
      width: ${f}px;
      height: ${f}px;
      font-size: ${f/2}px;
    `;
    
    // timer ++
    // if (timer > Infinity) {
    //   console.log(true)
    //   for (let i = 0; i < 27; i++) {
    //     clearInterval(i)
    //   }
    // }
  }, 1000);
  // console.log(callBallIntervalId)
  
}

