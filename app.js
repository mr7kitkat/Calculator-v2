// array of character code of
//                     (    )    ⨯     ÷   +    −     %  or mathOperators
const mathOperators = [40, 41, 10799, 247, 43, 8722, 37];
let expressionArray;

const inputButtons = document.querySelectorAll('.num');
const expressionInput = document.querySelector('#expression');
inputButtons.forEach(button => {
    button.addEventListener('click', function(e){
        let input = e.target.innerText;
        expressionInput.innerText += input;
    })
})

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', function(e){
    expressionInput.innerText = '';
})

const backSpaceButton = document.querySelector('#backspace');
backSpaceButton.addEventListener('click', function(e){
    let getCurrentExpression = expressionInput.innerText;
    expressionInput.innerText = getCurrentExpression.slice(0,getCurrentExpression.length - 1);
})

const equalButton = document.querySelector('#equal');
equalButton.addEventListener('click',function(){
    expressionArray = getExpressionArray(expressionInput.innerText);
})

// -----------------------------------------------------------------------------------------------
// List of Functions    
// -----------------------------------------------------------------------------------------------
// Function to replace all value inside a string
function replaceAll(str, oldValue, newValue) {
    while(str.includes(oldValue)){
        str = str.replace(oldValue,newValue)
    }
    return str;
}

function getExpressionArray(expression){
    const returnArray = []
    let nums = ''
    for(let i = 0; i <= expression.length; i++){ 
        if (i === expression.length) {
            returnArray.push(Number(nums)); 
            return returnArray;
        }

        if(mathOperators.includes(expression.charCodeAt(i))){
            if(nums) {
                returnArray.push(Number(nums));
                nums = '';
            }
            returnArray.push(expression[i]);
        }else {
            nums += expression[i];
        }        
    }
}


function calcBrackets(expArray) {
    let bracketStart = expArray.indexOf('('); 
    let bracketEnd = expArray.indexOf(')'); 
    let deleteCharacters = (bracketStart - bracketEnd) + 1;

    let bracketExpression = expArray.slice(bracketStart+1, bracketEnd);

    bracketExpression
    let insert = evaluate(bracketExpression);

    return expArray.splice(bracketStart, deleteCharacters, insert);
}



// function solveOperations(expArray, operator1, operator2) {
//     let operator1Index;
//     if (!expArray.includes(operator1)) {
//         operator1Index = expArray.length;
//     }else {
//         operator1Index = expArray.indexOf(operator1);
//     }
    
    
//     let operator2Index;
//     if (!expArray.includes(operator2)) {
//         operator2Index = expArray.length;
//     }else {
//         operator2Index = expArray.indexOf(operator2);
//     }
    

//     let min = Math.min(operator1Index, operator2Index);

//     let firstArg = expArray[min - 1];
//     let secondArg = expArray[min + 1];

//     let spliceStart = expArray.indexOf(operator1);
//     let deleteItems = 3;
//     let result = 0;

//     if (expArray.charCodeAt[min] === 10799) {
//         result = firstArg * secondArg;
//     }else if (expArray.charCodeAt[min] === 247) {
//         result = firstArg / secondArg;
//     }else if (expArray.charCodeAt[min] === 43) {
//         result = firstArg + secondArg;
//     }else if (expArray.charCodeAt[min] === 8722) {
//         result = firstArg - secondArg;
//     }

//     return expArray.splice(spliceStart, deleteItems, result);
// }

// console.log(solveOperations(2,"/",2))