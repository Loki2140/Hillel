function add(...secondNumber) {
  return (accamulator = secondNumber.reduce(
    (prev, cur) => (prev += cur),
    accamulator
  ));
}
//CommonJS
module.exports = add;
