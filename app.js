/*
NAME OF THE FILE = app.js

PURPOSE = 
A simple code file for Calculator in Vanilla Js


*************Areas***********
1. Functions  (line1 - line282)
      a. Analyzers
      b. bracketAnalyzer
      c. fullAnalyzer (Analyzers + bracketAnalyzer)
      d. solver
      e. percentageSolver
      f. bracketSolver
      g. calculate
      h. evaluate

2. Test for function (commented out) -  (line456 - line492)
3. Event Listners  -  (line587 - line670)
      a. Keyboard input
      b. click input

*/










//---------------------------------------------------- Functions------------------------------------------------------------
const operators = '()*/+-%';

// The Below function takes an string as input and convert it and returns an array
//----------------------------------------------Analyzers-----------------------------------------------
function analyzer(str) {
  const exp = [];
  let num = ''
  
  for (let i = 0; i <= str.length; i++) {
    let c = str[i];
    
    if (c === '⨯') {
      c = '*';
    }
    else if (c === '÷') {
      c = '/';
    }
    else if (c === '+−') {
      c = '+';
    }
    else if (c === '−') {
      c = '-';
    }

    if(i === str.length) {
      if (num) {
        exp.push(Number(num));
      }
      return exp;
    }
    
    if (!operators.includes(c)) {
      num += c;
    }
    else if (operators.includes(c)) {
      if (num) {
        exp.push(Number(num));
      }
      
      exp.push(c);
      num = '';
      
    }
  }
}
// -----------------------------------------------------------------------------------------------------

// This function analyses brackets and put an object in array which is returned by analyzer function
function bracketAnalyzer(arr) {
  const bracket = {}
  let maxOccursion = 0;
  let prec = 0;
  
  for (let i = 0; i <= arr.length; i++) {
  let c = arr[i];
  
  if (i === arr.length) {
    arr.unshift(bracket);
    return arr;
  }
  
  if (c === '(') {
    prec += 1;
  
    if (prec > maxOccursion) {
      maxOccursion = prec;
      bracket.max = maxOccursion;
    }
    
    bracket[`b${prec}`] = {
      name: '(',
      start: i + 1,
      precedence: prec,
    }
        
  }
  else if (c === ')') {
    bracket[`b${prec}`].end = i + 1;
    prec -= 1;
  }
 }
  
}
// -----------------------------------------------------------------------------------------------------

// it combines analyzer and bracketAnalyzer function and returns a fully cooked array
function fullAnalyzer(str) {
  let arr = analyzer(str);
  if (arr.includes('(') || arr.includes(')')) {
    bracketAnalyzer(arr);
  }
  
  return arr;
}
// -----------------------------------------------------------------------------------------------------

// it takes symbol and two arguments as input and run propriate operation on it.
//Expression solver
function solver(sym, arg1, arg2) {
  
  if (sym === '*') {
    return calcProduct(arg1, arg2);
  }
  else if (sym === '/') {
    return calcDivision(arg1, arg2);
  }
  else if (sym === '+') {
    return calcSum(arg1, arg2);
  }
  else if (sym === '-') {
    return calcSubs(arg1, arg2);
  }
  
}
// -----------------------------------------------------------------------------------------------------

// It solves percentage and modify the array -----------------------------------
function percentageSolver(arr) {
  let percentIdx = arr.indexOf('%');
  let noWithPercent = arr[percentIdx - 1];
  let preSymbol = arr[percentIdx - 2];
  let num2 = null;
  let res = 0;

  if (!preSymbol || preSymbol === '*' || preSymbol === '(' || preSymbol === '/') {
    num2 = 1;
  }
  else if (preSymbol && (preSymbol === '+' || preSymbol === '-')){
    num2 = arr[percentIdx - 3]; 
  }

  res = calcPercent(noWithPercent,num2);
    arr.splice(percentIdx - 1, 2, res);
}
// -----------------------------------------------------------------------------------------------------


// It solve bracket first and modify an array----------------------------------------------------------
function bracketSolver(arr) {
  
  
  while (arr.includes('(') || arr.includes(')')) {
    let obj = arr[0];
    let max = obj.max;
  
    let start = obj[`b${max}`].start;
    let end = obj[`b${max}`].end;
    let del = (end - start) + 1;
    
    let subArr = arr.slice(start + 1, end);
    let res = calculate(subArr);
    arr.splice(start, del, res);
    arr.shift();
   
    if (arr.includes('(') || arr.includes(')')) {
      bracketAnalyzer(arr)
    }
  }
}
// -----------------------------------------------------------------------------------------------------

// It runs overall all operation on array and return a single value ------------
function calculate(arr) {
  while(arr.length > 1) {

    if (arr.includes('%')) {
      percentageSolver(arr);
    }
    else if (arr.includes('*') || arr.includes('/')) {
      let star = arr.indexOf('*');
      if (star < 0) {
        star = arr.length;
      }
    
      let div = arr.indexOf('/');
      if (div < 0) {
        div = arr.length;
      }
    
      let minIdx = Math.min(star, div);
    
      let sym = arr[minIdx];
      let arg1 = arr[minIdx - 1];
      let arg2 = arr[minIdx + 1];
    
      let res = solver(sym, arg1, arg2);
      arr.splice(minIdx - 1, 3, res);
    }
    else if (arr.includes('+') || arr.includes('-')) {
      let plus = arr.indexOf('+');
      if (plus < 0) {
        plus = arr.length;
      }
    
      let minus = arr.indexOf('-');
      if (minus < 0) {
        minus = arr.length;
      }
    
      let minIdx = Math.min(plus, minus);
    
      let sym = arr[minIdx];
      let arg1 = arr[minIdx - 1];
      let arg2 = arr[minIdx + 1];
    
      let res = solver(sym, arg1, arg2);
      arr.splice(minIdx - 1, 3, res);
    }

  }
  
  let result = arr[0];
  if (isFloat(result)) {
    result = Number(result.toFixed(10));
  }
  return result;
}
// -----------------------------------------------------------------------------------------------------











// It takes a single string, then analyse it, solve expression and return a single value
// IT IS THE SUM OF ALL THE FUNCTIONS 
function evaluate(str) {
  let arr = fullAnalyzer(str);
  if (typeof arr[0] === 'object') {
    bracketSolver(arr);
  }

  let res = calculate(arr);
  return res;
}
// -----------------------------------------------------------------------------------------------------










//Mathematical Functions
function calcSum (num1, num2 = 0) {
  return num1 + num2;
}
function calcSubs (num1, num2 = 0) {
  return num1 - num2;
}
function calcProduct (num1, num2 = 1) {
  return num1 * num2;
}
function calcDivision (num1, num2 = 1) {
  return num1 / num2;
}
function calcPercent (num1, num2 = 1) {
  return num1 * (num2 / 100);
}

// these two Copied from Stackoverflow (:-P)------------
// IT checks if a number is integer or not
function isInteger(x) { return typeof x === "number" && isFinite(x) && Math.floor(x) === x; }
// IT checks if a number is float or not
function isFloat(x) { return !!(x % 1); }





let bracketCount = 0;
// It runs validation on each input and returns a value which force user to have right input
function validationCheckupOnEachInput(input) {
  const mathOpr = '÷⨯−+';
  let lastChar= inputDisplay.innerText.slice(-1);

  if (mathOpr.includes(input) && mathOpr.includes(lastChar)) {
    input = ''
  }
  else if (input === '%' && lastChar === '%') {
    input = ''
  }
  else if (input === '%' && mathOpr.includes(lastChar)) {
    input = ''
  }
  else if (lastChar === '%' && !mathOpr.includes(input)){
    input = ''
  }
  else if (lastChar === ')' && !mathOpr.includes(input)){
    input = ''
  }
  else if (bracketCount === 0 && input === ')') {
    input = ''
  }
  else if (input === '(') {
    
    if (lastChar === '(') {
      input = '('
      bracketCount += 1;
    }
    else if (!mathOpr.includes(lastChar)) {
      input = '';
    }
    else {
      input = '('
      bracketCount += 1;
    }
  }
  else if (input === ')') {
    
    if (lastChar === ')') {
      input = ')'
      bracketCount -= 1;
    }
    else if (mathOpr.includes(lastChar)) {
      input = '';
    }
    else {
      input = ')'
      bracketCount -= 1;
    }
  }
  

  return input;
}
// -------------------------------------

// ===========================================================================================================================













































































// ---------------------------------------------------------------------------------------------------------------------
// //---------------------------------------- Test zone---------------------------
// let i = 0;
// let result = 0
// const id = setInterval(function(){
//   if (i > test.length) {
//   clearInterval(id);
//   }
  
//   try{
//     console.log(`Expression is : ${test[i].p}`);
//     result = evaluate(test[i].p);

//     if (result === test[i].s) {
//       console.log('Test PASS!');
//       console.log(`result is ${result}`);
//     }
//     else {
//       console.log(
//       `Something is wrong
//       Exprected result => ${test[i].s}
//       Return result => ${result}`);
//     }

//     console.log('--------------------------------------------------------')
//   }
//   catch{
//     console.log('Something is broken!!!');
//     clearInterval(id);
//   }
//   i += 1;
// },1000)

// console.log(`Expression is : ${'(5*4)-3'}`);
// let result = evaluate('(5*4)-3');
// console.log(result);
// ----------------------------------------------------------------------------------------------------------------------------






























































































// =================================================== Displays =============================================================
const inputDisplay = document.querySelector('#input');
const resultDisplay = document.querySelector('#result');


// THIS EVENT LISTNER TAKES KEYBOARD INPUT
window.addEventListener('keydown', function(e) {
  let input = e.key;

  if (input === 'Backspace') {
    backspace();
  }
  else if (input === 'Enter') {
    equalBtn();
  }
  else if (input === 'Escape') {
    clearAllFunc();
  }

  let acceptedInput = '()*/+-.%'
  if (isNaN(Number(input))) {
    if (!acceptedInput.includes(input)) {
      input = ''
    }
    else if (input === '*') {
      input = '⨯';
    }
    else if (input === '/') {
      input = '÷';
    }
    else if (input === '+') {
      input = '+';
    }
    else if (input === '-') {
      input = '−';
    }
    else if (input === '%') {
      input = '%';
    }
  }

  input = validationCheckupOnEachInput(input);

  inputDisplay.innerText += input;
})

// THIS TAKES CLICK INPUT
const inputButtons = document.querySelectorAll('.input');
inputButtons.forEach(button => {
  button.addEventListener('click', function(e){
    let input = e.target.innerText;
    input = validationCheckupOnEachInput(input);
    inputDisplay.innerText += input;
  })
})

// THIS REMOVES A CHARACTER FROM INPUT BOX
const backspaceButton = document.querySelector('#backspace');
function backspace() {
  let text = inputDisplay.innerText;
  text = text.slice(0, text.length - 1);
  inputDisplay.innerText = text;
}
backspaceButton.addEventListener('click', backspace);


// THIS CLEAR INPUT BOX AND RESULT BOX
const clearAllButton = document.querySelector('#clear');
function clearAllFunc() {
  inputDisplay.innerText = '';
  resultDisplay.innerText = '';
  bracketCount = 0;
}
clearAllButton.addEventListener('click', clearAllFunc);


// THIS SHOWS RESULT ON PRESS EQUAL BUTTON
const equalButton = document.querySelector('#equal');
function equalBtn() {
  let str = inputDisplay.innerText;
  let result = evaluate(str);
  if (!result) {
    result = 0;
  }
  resultDisplay.innerText = result;
}
equalButton.addEventListener('click', equalBtn);