const numbersBtn = document.querySelectorAll(".number");
const displayScreen = document.querySelector(".display-screen");

numbersBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        valueToDisplay += btn.id;
        displayValue(valueToDisplay);
    });
});

let valueToDisplay = "";
let leftOperand;
let rightOperand;
let operator;

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