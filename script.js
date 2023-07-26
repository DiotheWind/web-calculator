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
        if (!(leftOperand === undefined && rightOperand === undefined && operator === undefined)) equalsBtn.disabled = false; 
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
            leftOperand = operate(+leftOperand, +rightOperand, operator);
            displayValue(leftOperand);   
            if (leftOperand === "Cannot divide by 0") {
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
    (answer === "Cannot divide by 0") ? valueHolder = "" : valueHolder = answer.toString();
    operator = undefined;
});

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
})

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

function clearCalculator() {
    valueHolder = "";
    leftOperand = undefined;
    rightOperand = undefined;
    operator = undefined;
    equalsBtn.setAttribute("disabled", "disabled");
}