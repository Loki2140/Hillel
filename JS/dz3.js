// Calculator - I made it harder for educational purposes only.
export default function dz3() {
  const firstNumber = Number(getNumber("Operand A"));
  const secondNumber = Number(getNumber("Operand B"));
  const symbol = String(getSymbol());

  if (isNaN(firstNumber) || isNaN(secondNumber) || symbol === "undefined") {
    alert(
      "You have not entered one of the important parameters! The task ended prematurely!"
    );
    return;
  }
  let total = getTotal(firstNumber, secondNumber, symbol);
  showFinalAlert(firstNumber, secondNumber, symbol, total);

  //
  // !!! Here's how to complete homework using a loop do()while. !!!
  //

  function checkUserData(number) {
    debugger;
    if (isNaN(number) || number === "") {
      alert("This is not a number! Please enter a number!");
      return false;
    } else {
      return true;
    }
  }

  function getNumber(message) {
    let valid = false,
      number;
    do {
      number = prompt(`Please enter a number! ${message}!`);
      if (number === null) {
        alert("You have canceled the task!");
        return;
      }
      valid = checkUserData(number);
    } while (valid === false);
    return number;
  }

  // !!! THE OLD ONE from DZ2 !!!
  // function getNumber() {
  //   const number = prompt("Введите число!");
  //   if (number === null) {
  //     alert("Вы отменили выполнение задачи!");
  //   } else if (isNaN(number) || number === "") {
  //     alert("Это не число Введите число!");
  //     return getNumber();
  //   } else {
  //     return number;
  //   }
  // }

  //
  // !!! End of homework !!!
  //

  function getSymbol() {
    const symbol = prompt(
      "Please enter one of the available symbols! '/' | '*' | '+' | '-'"
    );
    if (symbol === null) {
      alert("You have canceled the task!");
    } else if (["/", "+", "*", "-"].includes(symbol)) {
      return symbol;
    } else {
      alert("This is not one of the symbols!");
      return getSymbol();
    }
  }

  function getTotal(firstNumber, secondNumber, action) {
    switch (action) {
      case "+":
        return firstNumber + secondNumber;
      case "-":
        return firstNumber - secondNumber;
      case "/":
        return firstNumber / secondNumber;
      case "*":
        return firstNumber * secondNumber;
    }
  }

  function showFinalAlert(firstNumber, secondNumber, symbol, total) {
    return alert(`${firstNumber}${symbol}${secondNumber}=${total}`);
  }
}
