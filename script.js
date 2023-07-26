const numbersBtn = document.querySelectorAll(".number");
const operatorBtn = document.querySelectorAll(".operator");
const equalsBtn = document.querySelector(".equals");
const displayScreen = document.querySelector(".display-screen");

let valueToDisplay = "";
let leftOperand;
let rightOperand;
let operator;

numbersBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        valueToDisplay += btn.id;
        displayValue(valueToDisplay);
    });
});

operatorBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        leftOperand = valueToDisplay;
        operator = btn.id;
        valueToDisplay = "";
    });
});

equalsBtn.addEventListener("click", () => {
    rightOperand = valueToDisplay;
    displayValue(operate(+leftOperand, +rightOperand, operator));
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

    if (!(Number.isInteger(ans))) {
        return ans.toFixed("8");
    } else {
        return ans;
    }
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
    return num1 / num2;
}