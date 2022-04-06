// Calculator - I made it harder for educational purposes only. Just to test strings metods and loops.
export default function dz4() {
  const arrNumbers = getNumbers();
  const symbol = getSymbol();
  if (!symbol || !arrNumbers) {
    alert(
      "You have not entered one of the important parameters! The task ended prematurely!"
    );
    return;
  }
  let result = getTotal(arrNumbers, symbol);
  showFinalAlert(arrNumbers, symbol, result);

  function getNumbers() {
    let arrNumbers = prompt(
      "Enter the numbers you want to interact with! Use SPACE between numbers!!!",
      "22sdsd dfdf 2 dsd2 2 2 2"
    );
    if (arrNumbers === null) {
      alert("You have canceled the task!");
      return;
    }
    return sortArrNum4(arrNumbers.split(" ")); // You can choose one of the metod sortArrNum1, sortArrNum2, sortArrNum3, sortArrNum4
  }

  // Checking is it a number? Metod #1 FOR - array iteration
  function sortArrNum1(initialArr) {
    let finalArr = [];
    for (let i = 0; i < initialArr.length; i++) {
      !isNaN(initialArr[i])
        ? finalArr.push(Number(initialArr[i]))
        : alert(`'${initialArr[i]}' is not a number, I threw it in the trash.`);
    }
    return finalArr;
  }
  // Checking is it a number? Metod #2 forEach - different type of iterate over array variables
  function sortArrNum2(initialArr) {
    let finalArr = [];
    initialArr.forEach((el) => {
      !isNaN(el)
        ? finalArr.push(Number(el))
        : alert(`'${el}' is not a number, I threw it in the trash.`);
    });
    return finalArr;
  }
  // Checking is it a number? Metod #3 ForOf - different array iteration
  function sortArrNum3(initialArr) {
    let finalArr = [];
    for (const number of initialArr) {
      !isNaN(number)
        ? finalArr.push(Number(number))
        : alert(`'${number}' is not a number, I threw it in the trash.`);
    }
    return finalArr;
  }
  // Checking is it a number? Metod #4 map - different type of iterate over array variables
  function sortArrNum4(initialArr) {
    let finalArr = [];
    initialArr.map((el) => {
      //It is better not to use a map for such purposes. But it's stil work.
      !isNaN(el)
        ? finalArr.push(Number(el))
        : alert(`'${el}' is not a number, I threw it in the trash.`);
    });
    return finalArr;
  }

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

  function getTotal(arr, action) {
    switch (action) {
      case "+":
        return arr.reduce((sum, curent) => (sum += Number(curent))); // it is better to cast the data to a number here, but for learning purposes i tried different places for Numbers()
      case "-":
        return minus(arr); // only for learning purposes
      // return arr.reduce((sum, curent) => (sum -= curent));
      case "/":
        return arr.reduce((sum, curent) => (sum /= curent));
      case "*":
        return multiply(arr); // only for learning purposes
      // return arr.reduce((sum, curent) => (sum *= curent));
    }
  }

  // only for learning purposes
  function minus(arr) {
    let total;
    for (let i = 0; i < arr.length; i++) {
      i === 0 ? (total = arr[i]) : (total -= arr[i]);
    }
    return total;
  }
  // only for learning purposes
  function multiply(arr) {
    let total;
    for (let i = 0; i < arr.length; i++) {
      i === 0 ? (total = arr[i]) : (total *= arr[i]);
    }
    return total;
  }

  function showFinalAlert(arr, symbol, total) {
    let finalMsg = [];
    for (let i = 0; i < arr.length; i++) {
      finalMsg.push(arr[i]);
      finalMsg.push(symbol);
    }
    finalMsg.pop();
    finalMsg.push("=");
    finalMsg.push(total);
    alert(finalMsg.join(""));
  }
}
