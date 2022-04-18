export default function dz7() {
  const calc = createCalculator(10);

  function createCalculator(number) {
    let accamulator = number;
    return {
      sum(...secondNumber) {
        accamulator = secondNumber.reduce(
          (prev, cur) => (prev += cur),
          accamulator
        );
        return this;
      },
      mult(...secondNumber) {
        accamulator = secondNumber.reduce(
          (prev, cur) => (prev *= cur),
          accamulator
        );
        return this;
      },
      sub(...secondNumber) {
        accamulator = secondNumber.reduce(
          (prev, cur) => (prev -= cur),
          accamulator
        );
        return this;
      },
      div(...secondNumber) {
        accamulator = secondNumber.reduce(
          (prev, cur) => (prev /= cur),
          accamulator
        );
        return this;
      },
      set(secondNumber) {
        accamulator = secondNumber;
        return this;
      },
      get() {
        return accamulator;
      }
    };
  }

  // console.log(calc.sum(5)); /// 15
  // console.log(calc.mult(10)); /// 150
  // console.log(calc.sub(40)); /// 110
  // console.log(calc.div(10)); /// 11
  // console.log(calc.set(100)); // 100
  // console.log(calc.get());
  // console.log(calc.set(0));
  // console.log(calc.get());
  // console.log(calc.sum(5)); /// 5

  console.log(calc.sum(5,10).mult(10).sub(40).div(10).get()); // 21
  console.log(calc.set(0).sum(10).sub(40).div(10).get()); // -3
}
