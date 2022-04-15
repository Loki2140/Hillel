export default function dz7() {
  const calc = createCalculator(10);

  function createCalculator(number) {
    let accamulator = number;
    return {
      sum(...secoundNumber) {
        accamulator = secoundNumber.reduce(
          (prev, cur) => (prev += cur),
          accamulator
        );
        return this;
      },
      mult(...secoundNumber) {
        accamulator = secoundNumber.reduce(
          (prev, cur) => (prev *= cur),
          accamulator
        );
        return this;
      },
      sub(...secoundNumber) {
        accamulator = secoundNumber.reduce(
          (prev, cur) => (prev -= cur),
          accamulator
        );
        return this;
      },
      div(...secoundNumber) {
        accamulator = secoundNumber.reduce(
          (prev, cur) => (prev /= cur),
          accamulator
        );
        return this;
      },
      set(secoundNumber) {
        accamulator = secoundNumber;
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

  console.log(calc.sum(5).mult(10).sub(40).div(10).get()); // 11
  console.log(calc.set(0).sum(10).sub(40).div(10).get()); // -3
}
