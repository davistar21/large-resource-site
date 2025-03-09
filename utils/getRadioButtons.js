export default function getRadioValue(radioButtons){
    radioButtons.forEach((button) => {
			if (button.checked) {
				console.log(button.value)
			}	
      button.addEventListener('change', (e)=>{
        console.log(button.value)
        if(e.target.checked) {
            let selectedValue = e.target.value;
            console.log(selectedValue)
        }
      })
  });
}

