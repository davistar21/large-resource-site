export default function handleDarkMode() {
  let isDarkMode;
  document.querySelector('.dark-mode-button').addEventListener('click', () => {
    isDarkMode = document.body.classList.toggle('dark');
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  })
  
  isDarkMode = JSON.parse(localStorage.getItem('isDarkMode'));
  if (!isDarkMode) {
    document.body.classList.remove('dark')
  } else {
    document.body.classList.add('dark')
  }  
}