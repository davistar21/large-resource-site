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
