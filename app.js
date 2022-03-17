const buttons = document.querySelectorAll('.num');
const expression = document.querySelector('#expression');

// Add functionality to Clear or Reser button
const clear = document.querySelector('.clear');
clear.addEventListener('click', function(){
    expression.innerText ='';
})

// Add functionality to BackSpace button
const backspace = document.querySelector('.backspace');
backspace.addEventListener('click', function(){
    let currval = expression.innerText;
    expression.innerText = currval.slice(0,currval.length - 1);
})

buttons.forEach(button => {
    button.addEventListener('click',function(e){
        let keyval = e.target.innerText;
        expression.innerText += keyval;
    })
})

