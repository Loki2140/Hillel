export default function dz6() {
  const obj = {
    name: "Alex",
    age: 33,
    stage: null,
    adress: {
      country: "UA",
      city: "Dnipro"
    },
    marks: { history: [2, 3, 4, [2, 3, 4, 5]], math: [[2, 3, 4, 5], 5, 3, 5] }
  };

  const objCopy = copy(obj);

  console.log("Original obj ", obj);
  console.log("Original obj is changing!!!");
  obj.adress.country = "POL";
  obj.adress.city = "Warsaw";
  obj.name = "Tom";
  obj.marks.history.shift();
  obj.marks.math.pop();
  obj.marks.math[0].pop();
  console.log("Original obj is changed!!!");
  console.log("Changed obj ", obj);
  console.log("Copy obj ", objCopy);

  function copy(obj) {
    let newObj = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
      newObj[key] =
        typeof obj[key] === "object" && obj[key] !== null
          ? copy(obj[key])
          : obj[key];
    }
    return newObj;
  }
}
