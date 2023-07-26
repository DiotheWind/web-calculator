const numbersBtn = document.querySelectorAll(".number");
const operatorBtn = document.querySelectorAll(".operator");
const equalsBtn = document.querySelector(".equals");
const displayScreen = document.querySelector(".display-screen");

let valueHolder = "";
let leftOperand;
let rightOperand;
let operator;

numbersBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        valueHolder += btn.id;
        displayValue(valueHolder);
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
            operator = btn.id;
            valueHolder = "";
        }
    });
});

equalsBtn.addEventListener("click", () => {
    rightOperand = valueHolder;
    const answer = operate(+leftOperand, +rightOperand, operator);
    displayValue(answer);
    valueHolder = answer;
    operator = undefined;
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
    return num1 / num2;
}