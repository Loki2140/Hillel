// I tried to use the code from previous tasks so that I don't have to write anything again. It still works)
export default function dz8() {
  const inputs = document
    .getElementsByClassName("mainPart")[0]
    .getElementsByTagName("input");
  const result = document.querySelector(".result");
  const error = document.querySelector(".error");
  const operandA = createCalculator(checkOperand(inputs[0].value, "Operand A"));
  const operandB = checkOperand(inputs[1].value, "Operand B");
  const sumbol = document.getElementsByName("mathAction")[0].value;
  commitAction(operandB, sumbol);
  setTimeout(clean, 2500);

  function clean() {
    inputs[0].value = "";
    inputs[1].value = "";
    result.innerHTML = "";
    error.innerHTML = "";
  }

  function checkOperand(operand, msg) {
    return operand === "" || isNaN(operand)
      ? showError(`'${msg}' is not a number! `)
      : Number(operand);
  }
  // Function below is too complex for this task, bit stil works fine.
  function createCalculator(number) {
    return {
      sum: (...secondNumber) =>
        createCalculator(
          secondNumber.reduce((prev, cur) => (prev += cur), number)
        ),
      mult: (...secondNumber) =>
        createCalculator(
          secondNumber.reduce((prev, cur) => (prev *= cur), number)
        ),
      sub: (...secondNumber) =>
        createCalculator(
          secondNumber.reduce((prev, cur) => (prev -= cur), number)
        ),
      div: (...secondNumber) =>
        createCalculator(
          secondNumber.reduce((prev, cur) => (prev /= cur), number)
        ),
      set: (secondNumber) => {
        createCalculator((number = secondNumber));
      },
      get() {
        return number;
      }
    };
  }

  function showResult(num) {
    result.innerHTML = num;
  }

  function showError(err) {
    error.insertAdjacentHTML("beforeend", `<div>${err}</div>`);
  }

  function commitAction(operandB, action) {
    switch (action) {
      case "+":
        return showResult(operandA.sum(operandB).get());
      case "-":
        return showResult(operandA.sub(operandB).get());
      case "/":
        return showResult(operandA.div(operandB).get());
      case "*":
        return showResult(operandA.mult(operandB).get());
    }
  }
}
