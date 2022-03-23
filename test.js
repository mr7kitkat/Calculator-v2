/*
First we want some expression input from user
check if user input correct
make a stack from expression
solve brackets First
after brackets solve divide and multiply
after divide and multiply solve plus and minus
do this process untill result become one number
*/

const test = [
    {
        p: '2+9',
        s: 11
    },
    {
        p: '7-5',
        s: 2
    },
    {
        p: '5*3',
        s: 15
    },
    {
        p: '9/3',
        s: 3
    },
    {
        p: '3+9*4',
        s: 39
    },
    {
        p: '5/5+8*4-3+5',
        s: 35
    },
    {
        p: '9*7+49/7-3-1+5',
        s: 71
    },
    {
        p: '4+9-8*8+3*6/2',
        s: -42
    },
    {
        p: '4+8/4+3*6+3-2/3+2',
        s: 28.33333
    }
]



function parser(str) {
    const operators = '()*/+-%';
    let arr = []
    let num = '';
    let bracketFound = 0;

    for (let i = 0; i <= str.length; i++) {
        let c = str[i];

        if (i === str.length) {
            if (num) {
                arr.push(Number(num));
                num = '';
            }
            return arr;
        }

        if ( !operators.includes(c) ) {
            num += c;
        }
        else {
            if (num) {
                arr.push(Number(num));
                num = '';
            }
            arr.push(c);
        } 
    }
}



// Solve normal multiply, divide, plus,  minus
function solver (arr) {
    let result = null;

    while(arr.length > 1) {

        if (arr.includes('*') || arr.includes('/')) {
            let starIndex = arr.indexOf('*');
            if (starIndex < 0) {
                starIndex = arr.length;
            }
    
            let divIndex = arr.indexOf('/');
            if (divIndex < 0) {
                divIndex = arr.length;
            }
    
            let minSDIndex = Math.min(starIndex, divIndex);
    
            let arg1 = arr[minSDIndex - 1];
            let arg2 = arr[minSDIndex + 1];
            
            if (arr[minSDIndex] === '*') {
                result = arg1 * arg2;
            }
            else {
                result = arg1 / arg2;
            }
    
            let spliceStartforMD = minSDIndex - 1;
            arr.splice(spliceStartforMD, 3, result);
            result = null;
        }
        else if (arr.includes('+') || arr.includes('-')) {
            let plusIndex = arr.indexOf('+');
            if (plusIndex < 0) {
                plusIndex = arr.length;
            }
    
            let minusIndex = arr.indexOf('-');
            if (minusIndex < 0) {
                minusIndex = arr.length;
            }
    
            let minPMIndex = Math.min(plusIndex, minusIndex);
    
            let arg1 = arr[minPMIndex - 1];
            let arg2 = arr[minPMIndex + 1];
            
            if (arr[minPMIndex] === '+') {
                result = arg1 + arg2;
            }
            else if (arr[minPMIndex] === '-') {
                result = arg1 - arg2;
            }
    
            let spliceStartforPM = minPMIndex - 1;
            arr.splice(spliceStartforPM, 3, result);
            result = null;
        }
    }

    result = arr[0];
    return result;

}




































// This ensure the test
let item = null;
let i = 0;

const id = setInterval(function(){
       
    item = test[i]

    let expression = parser(item.p);
    let result = solver(expression);

    console.log(`Problem: ${item.p}`);
    console.log(`array expression: ${parser(item.p)}`);

    if (result === item.s){
        console.log(`Yippy we paas this text`);
        console.log(`${result} is same as ${item.s}`);
    }
    else {
        console.log(`Something is wrong`);
        console.log(`expected ${item.s}, but result is ${result}`);
        
    }
console.log('--------------------------------------------------------------------');
i += 1;
if (i === test.length) {
    clearInterval(id);
}
},1000);

