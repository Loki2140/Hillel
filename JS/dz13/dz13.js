"use strict";
const resultField = document.querySelector(".homework");

function Calculator(num) {
  this.result = num;
}

Calculator.prototype.sum = function (secondNum) {
  this.showResult((this.result += secondNum), "sum");
};
Calculator.prototype.mult = function (secondNum) {
  this.showResult((this.result *= secondNum), "mult");
};
Calculator.prototype.sub = function (secondNum) {
  this.showResult((this.result -= secondNum), "sub");
};
Calculator.prototype.div = function (secondNum) {
  this.showResult((this.result /= secondNum), "div");
};
Calculator.prototype.showResult = function (result, msg) {
  resultField.insertAdjacentHTML(
    "beforeend",
    `<div> Result of ${msg} is ${result}</div>`
  );
};
Calculator.prototype.finalResult = function () {
  this.showResult(this.result, "all operations");
};

// Справка
// Занятие 13. this, функции конструкторы
const calc = new Calculator(10);

calc.sum(5); /// 15
calc.mult(10); // 150
calc.sub(40); // 110
calc.div(10); // 11
calc.finalResult(); // 11

console.log(calc.result); // 11 - результат последнего действия
