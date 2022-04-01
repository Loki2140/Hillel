// Calculator - усложнял исключительно в образовательных целях.

export default function dz2() {
  const firstNumber = Number(getNumber());
  const secondNumber = Number(getNumber());
  const symbol = String(getSymbol());
  let total;

  if (isNaN(firstNumber) || isNaN(secondNumber) || symbol === "undefined") {
    alert("Вы не ввели один из важных параметров! Задача завершена!");
    return;
  }

  function getNumber() {
    const number = prompt("Введите число!");
    if (number === null) {
      alert("Вы отменили выполнение задачи!");
    } else if (isNaN(number) || number === "") {
      alert("Это не число Введите число!");
      return getNumber();
    } else {
      return number;
    }
  }

  function getSymbol() {
    const symbol = prompt(
      "Введите один из доступных символов! '/' | '*' | '+' | '-'"
    );
    if (symbol === null) {
      alert("Вы отменили выполнение задачи!");
    } else if (["/", "+", "*", "-"].includes(symbol)) {
      return symbol;
    } else {
      alert("Это не один из символов!");
      return getSymbol();
    }
  }

  function finalAlert(firstNumber, secondNumber, symbol, total) {
    alert(`${firstNumber}${symbol}${secondNumber}=${total}`);
  }

  switch (symbol) {
    case "+":
      finalAlert(
        firstNumber,
        secondNumber,
        symbol,
        (total = firstNumber + secondNumber)
      );
      break;
    case "-":
      finalAlert(
        firstNumber,
        secondNumber,
        symbol,
        (total = firstNumber - secondNumber)
      );
      break;
    case "/":
      finalAlert(
        firstNumber,
        secondNumber,
        symbol,
        (total = firstNumber / secondNumber)
      );
      break;
    case "*":
      finalAlert(
        firstNumber,
        secondNumber,
        symbol,
        (total = firstNumber * secondNumber)
      );
      break;
    default:
      alert("Что-то пошло не так...");
      break;
  }
}
