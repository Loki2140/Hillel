// I tried to use the code from previous tasks so that I don't have to write anything again. It still works)
export default function dz8() {
  const mainElement = document.querySelector(".mainPart");
  const resultFild = mainElement.querySelector(".result");
  const errorFild = mainElement.querySelector(".error");
  const operandA = mainElement.querySelector(".firstOperand").value;
  const operandB = mainElement.querySelector(".secondOperand").value;
  const sumbol = mainElement.querySelector(".mathAction").value;
  const err = [];

  !(function startCalc(sumbol, ...operands) {
    operands = operands.map((el, index) => checkOperand(el, index));
    if (err.length <= 0) {
      commitAction(sumbol, ...operands);
      setTimeout(clean, 2500);
    } else {
      showError(err);
      setTimeout(clean, 2500);
    }
  })(sumbol, operandA, operandB);

  function clean() {
    resultFild.innerHTML = "";
    errorFild.innerHTML = "";
  }

  function checkOperand(operand, index) {
    if (operand === "" || isNaN(operand)) {
      err.push(`'Operand ${index + 1}' is not a number! `);
      return operand;
    }
    return Number(operand);
  }

  function showResult(num) {
    resultFild.innerHTML = num;
  }

  function showError(err) {
    err.forEach((el) => {
      errorFild.insertAdjacentHTML("beforeend", `<div>${el}</div>`);
    });
    resultFild.insertAdjacentHTML(
      "beforeend",
      "<span style='color: red;'>Error</span>"
    );
  }

  function commitAction(action, operandA, operandB) {
    switch (action) {
      case "+":
        return showResult((operandA += operandB));
      case "-":
        return showResult((operandA -= operandB));
      case "/":
        return showResult((operandA /= operandB));
      case "*":
        return showResult((operandA *= operandB));
    }
  }
}
let operands = document.querySelectorAll(".class");
[...operands.forEach((el) => el.value)];
