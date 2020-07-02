let display = document.querySelector("#mainDisplay");
let values = [];
let opers = [];
let pressedEnter = false;
let pressedDecimal = false;

//Number checker
const numbers = document.querySelectorAll(".numbers");
numbers.forEach(button => button.addEventListener('click', addToMain));

//Operator checker
const operator = document.querySelectorAll(".operation");
operator.forEach(button => button.addEventListener('click', opButton));

//Decimal checker
const deci = document.querySelector("#dot");
deci.addEventListener('click', deciPress);

//Backspace checker
const back = document.querySelector("#back");
back.addEventListener('click', backSpace);
//Enter checker
const enter = document.querySelector("#enter");
enter.addEventListener('click', enterPress);

//Clear checker
const checkClear = document.querySelector("#clear");
checkClear.addEventListener('click', clear);

//Display UPDATE on number press
function addToMain(e) {
    if (pressedEnter == false) {
        display.textContent += this.value;
    } else {
        clear();
        pressedEnter = false;
        display.textContent += this.value;
    }
}

//Update on Operation BUTTON PRESS
function opButton(e) {
    console.log("Pressed ENTER?" + pressedEnter);
    if (pressedEnter == false) {
        values.push(Number(display.textContent));
        opers.push(this.value);
        pressedDecimal = false;
        display.textContent = "";
        console.log(values);
        console.log(opers);
    } else {
        pressedEnter = false;
        opers.push(this.value);
        display.textContent = "";
    }
}


//PRESSED ENTER KEY
function enterPress(e) {
    pressedEnter = true;
    console.log("PRessed Enter");
    if (display.textContent != "") {
        values.push(Number(display.textContent))
    }

    console.log(values);
    console.log(opers);
    display.textContent = operate();
}

//PRESSED DECIMAL KEY
function deciPress(e) {
    if (pressedDecimal == false) {
        if (pressedEnter == false) {
            display.textContent += this.value;
            pressedDecimal = true;
        } else {
            clear();
            display.textContent += this.value;
            pressedDecimal = true;
            pressedEnter = false;
        }
    }
}

//Actual operation preform
function operate() {
    if (values.length < 2) return;
    pressedDecimal = false;
    if (values.length == 2) return calc(values[0], values[1], opers[0]);

    let total = calc(values[0], values[1], opers[0]);
    let numIdx = 2;
    let opIdx = 1;
    while (numIdx != values.length) {
        total = calc(total, values[numIdx], opers[opIdx]);
        opIdx++;
        numIdx++;
    }
    return total;
}

//perform operatin based on input
function calc(val1, val2, op) {
    if (op == "+") return val1 + val2;
    if (op == "-") return val1 - val2;
    if (op == "*") return val1 * val2;
    if (op == "/") {
        if (isNaN(val1 / val2)) {
            return 0;
        }
        return val1 / val2;
    }
}

//Backspace function
function backSpace(e) {
    if(display.textContent != "")
    {
        if(pressedEnter == false)
        {
        if(display.textContent.charAt(display.textContent.length-1) == ".") pressedDecimal = false;
        display.textContent = display.textContent.substring(0,display.textContent.length-1);
        }
    }
}
//Clear ALL
function clear() {
    values = [];
    opers = [];
    display.textContent = "";
}