// CommonJS
module.exports = (...secondNumber) => {
  return (accamulator = secondNumber.reduce(
    (prev, cur) => (prev *= cur),
    accamulator
  ));
};
