const numbersBtn = document.querySelectorAll(".number");
const operatorBtn = document.querySelectorAll(".operator");
const equalsBtn = document.querySelector(".equals");
const clearBtn = document.querySelector(".clear");
const negativeBtn = document.querySelector(".negative");
const deleteBtn = document.querySelector(".delete");
const decimalBtn = document.querySelector(".decimal");
const displayScreen = document.querySelector(".display-screen");

let valueHolder = "";
let leftOperand;
let rightOperand;
let operator;

numbersBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        valueHolder += btn.id;
        displayValue(valueHolder);
        if (!(leftOperand === undefined && rightOperand === undefined && operator === undefined)) equalsBtn.disabled = false; // The Equals Button are initially disabled unless all two operands and an operator are present
    });
});

operatorBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        if (operator === undefined){
            leftOperand = valueHolder;
            operator = btn.id;
            valueHolder = "";
        } else {
            rightOperand = valueHolder;
            leftOperand = operate(+leftOperand, +rightOperand, operator);  // If a user enters several operations all at once, it will evaluate a pair of number one at a time.
            displayValue(leftOperand);   
            if (leftOperand === "Cannot divide by 0") {  // The calculator resets if the user tries to divide by 0 over the course of several operations
                clearCalculator();
            } else {
                operator = btn.id;
                valueHolder = "";
            }
        }
    });
});

equalsBtn.addEventListener("click", () => {
    rightOperand = valueHolder;
    const answer = operate(+leftOperand, +rightOperand, operator);
    displayValue(answer);
    (answer === "Cannot divide by 0") ? valueHolder = "" : valueHolder = answer.toString();  // The user cannot perform further operations on a "Cannot divide by 0" result
    operator = undefined;
});

// The negative and decimal button will not work if a negative sign or a decimal sign is already present, respectively
negativeBtn.addEventListener("click", () => {
    if (!(valueHolder.includes("-"))) {  
        valueHolder += "-";
        displayValue(valueHolder);
    }
});
                                              
decimalBtn.addEventListener("click", () => {
    if (!(valueHolder.includes("."))) {  
        valueHolder += ".";
        displayValue(valueHolder);
    }
});

deleteBtn.addEventListener("click", () => {
    valueHolder = valueHolder.slice(0, -1);
    displayValue(valueHolder);
});

clearBtn.addEventListener("click", () => {
    clearCalculator();
    displayValue(valueHolder);
});

function displayValue(value) {
    displayScreen.textContent = value;
}

function operate(num1, num2, operator) {
    let ans;
    switch(operator) {
        case "+":
            ans = add(num1, num2);
            break;
        case "-":
            ans = subtract(num1, num2);
            break;
        case "*":
            ans = multiply(num1, num2);
            break;
        case "/":
            ans = divide(num1, num2);
            break;
    }

    return ans;
}

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 === 0) {
        return "Cannot divide by 0";
    } else {
        return num1 / num2;
    }
}

function clearCalculator() {   // This function wipes out all existing data, reseting the calculator
    valueHolder = "";
    leftOperand = undefined;
    rightOperand = undefined;
    operator = undefined;
    equalsBtn.setAttribute("disabled", "disabled");
}