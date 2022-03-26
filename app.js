// Displays 
const inputDisplay = document.querySelector('#input');
const resultDisplay = document.querySelector('#result');

const stack = [];
let num = '';
let lastItemOfStack = null;

// Getting inputDisplay
const numbersButton = document.querySelectorAll('.num');
numbersButton.forEach(number => {
    number.addEventListener('click', function(e) {
        let input = e.target.innerText;
        num += input;

        if (stack.length) {
            lastItemOfStack = stack[stack.length - 1];
        }

        if (!(lastItemOfStack) || (typeof lastItemOfStack === 'number')) {
            stack.pop()
            stack.push(Number(num));
        }
        else if (typeof lastItemOfStack === 'string') {
            if (lastItemOfStack === '%') {
                input = ''
                num = ''
            }
            else {
                stack.push(Number(num));
            }
        }


        inputDisplay.innerText += input;
    })
})


const operatorsButton = document.querySelectorAll('.operator');
operatorsButton.forEach(operator => {
    operator.addEventListener('click', function(e) {
        let input = e.target.innerText;

        if (stack.length) {
            lastItemOfStack = stack[stack.length - 1];
        }

        if (typeof lastItemOfStack === 'number' || lastItemOfStack === '%' && input !== '%') {
            if (input === '⨯') {
                stack.push('*');
            }
            else if (input === "÷") {
                stack.push('/')
            }
            else {
                stack.push(input);
            }
        }
        else if (typeof lastItemOfStack === 'string') {
            input = '';
        }
            
        inputDisplay.innerText += input;
        num = '';
    })
})


// On press on equal button
const equalButton = document.querySelector('#equal');
equalButton.addEventListener('click', function() {
    
})


// Delete input buttons
const clearAllButton = document.querySelector('#clear');
clearAllButton.addEventListener('click', function() {
    inputDisplay.innerText = '';
    resultDisplay.innerText = '';

    num = '';
    
    while (stack.length) {
        stack.pop();
    }
    
    lastItemOfStack = null;
})

const backspaceButton = document.querySelector('#backspace');
backspaceButton.addEventListener('click', function() {
    let input = inputDisplay.innerText;
    inputDisplay.innerText = input.slice(0, input.length - 1);
})




// function evaluate(arr) {
//     while (arr.length > 1) {
//         if (arr.includes('*') || arr.includes('/')) {
//             precedenceAnalyzer(arr, '*', '/');
//         }
//         else if (arr.includes('+') || arr.includes('-')) {
//             precedenceAnalyzer(arr, '+', '-');
//         }
//         // else if (arr.includes('%')) {
//         //     precedenceAnalyzer(arr,)
//         // }
//     }

//     return arr[0];
// }



// function precedenceAnalyzer(arr, sym1, sym2) {

//     let firstSymbol = null;
//     if (sym1) {
//         firstSymbol = arr.indexOf(sym1);
//     }
//     else {
//         firstSymbol = arr.length;
//     }

//     let secondSymbol = null;
//     if (sym2) {
//         secondSymbol = arr.indexOf(sym2);
//     }
//     else {
//         secondSymbol = arr.length;
//     }

//     let minIndex = secondSymbol - firstSymbol + 1;

//     let symbol = arr[minIndex];
//     let num = arr[minIndex - 1];
//     let num2 = arr[minIndex + 1];

//     let result = solver(symbol, num, num2);

//     arr.splice(minIndex - 1, 3, result);
// }


function solver (sym, arg1, arg2) {
    if (sym === '*') {
        return calcMultiply(arg1, arg2);
    }
    else if (sym === '/') {
        return calcDivide(arg1, arg2);
    }
    else if (sym === '+') {
        return calcSum(arg1, arg2);
    }
    else if (sym === '-') {
        return calcSub(arg1, arg2);
    }
    else if (sym === '%') {
        return calcPercentage(arg1, arg2);
    }

}

// mathematical function 
function calcSum (a, b = 0) {
    return a + b;
}

function calcSub (a, b = 0) {
    return a - b;
}

function calcMultiply (a, b = 1) {
    return a * b;
}

function calcDivide (a, b = 1) {
    return a / b;
}

function calcPercentage (a, b = 1) {
    return a * (b / 100);
}