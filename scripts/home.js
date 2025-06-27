import handleDarkMode from "../utils/handleDarkMode.js";

const contentScroll = document.querySelectorAll('.content');

function checkScroll () {
    const windowHeight = window.innerHeight;
    contentScroll.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top < windowHeight && rect.bottom > 0){
            item.classList.add('visible')
        }
        else {
            item.classList.remove('visible');
        }
    })
}
checkScroll();
window.addEventListener('scroll', ()=>{
    checkScroll()
})

let isDarkMode = JSON.parse(localStorage.getItem('isDarkMode'));
if(isDarkMode){
    document.body.classList.add('dark')
} else {
    document.querySelector('.switch').classList.add('active')
    document.body.classList.remove('dark')
}

// const darkModeButton = document.getElementById('dark-mode-button');
// darkModeButton.addEventListener('click', ()=>{
//     let isDarkMode = document.body.classList.toggle('dark');
//     localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode))
// })


// let first = 'first';
// localStorage.setItem('myFirst', JSON.stringify(first));
// let myAFirst = JSON.parse(localStorage.getItem('myFirst'));
// console.log(myAFirst)

document.querySelectorAll('.switch').forEach(e => {
    e.addEventListener('click', () => {
        e.classList.toggle('active')
      })
    })

handleDarkMode()



