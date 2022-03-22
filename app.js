// It takes user input on click
const inputButtons = document.querySelectorAll('.num');
const expressionInput = document.querySelector('#expression');
inputButtons.forEach(button => {
    button.addEventListener('click', function(e){
        let input = e.target.innerText;
        expressionInput.innerText += input;
    })
})

// Clears all the input 
const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', function(e){
    expressionInput.innerText = '';
})

// it clears one character from last
const backSpaceButton = document.querySelector('#backspace');
backSpaceButton.addEventListener('click', function(e){
    let getCurrentExpression = expressionInput.innerText;
    expressionInput.innerText = getCurrentExpression.slice(0,getCurrentExpression.length - 1);
})

// *************** THE EQUAL BUTTON **********************
// What shits will happen when user clicks on Equal Button
const equalButton = document.querySelector('#equal');

