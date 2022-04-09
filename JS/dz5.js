export default function dz5() {
  const students = [
    {
      id: 10,
      name: "John Smith",
      marks: [10, 8, 6, 9, 8, 7]
    },
    {
      id: 11,
      name: "John Doe",
      marks: [9, 8, 7, 6, 7]
    },
    {
      id: 12,
      name: "Thomas Anderson",
      marks: [6, 7, 10, 8]
    },
    {
      id: 13,
      name: "Jean-Baptiste Emanuel Zorg",
      marks: [10, 9, 8, 9]
    }
  ];
  alert(`Student average mark is ${averageStudentMark(students[2])}`);
  alert(`All students average mark is ${averageGroupMark(students)} Method 1`);

  function averageStudentMark(arr) {
    let short = "marks" in arr ? arr.marks : arr;
    return short.reduce((sum, val) => (sum += val)) / short.length;
  }
  function averageGroupMark(arr) {
    let arrey = arr.map((el) => el.marks).flat(); // Also can be used .mapFlat();
    return averageStudentMark(arrey);
  }
  // Alternative way. Most likely this is the solution you were waiting for.
  alert(
    `All students average mark is ${averageGroupMarkTest(students)} Method 2`
  );
  function averageGroupMarkTest(students) {
    let arr = students.map((el) => el.marks);
    arr = arr.reduce((val, el) => val.concat(el), []);
    return averageStudentMark(arr);
  }

  // Задавание со звездочкой:
  // Вывести стастистику по группе:
  // Имя и средний бал студента с минимальным средним балом
  // Имя и средний бал студента с максимальным средним балом
  // Имя и средний бал студента с максимальным количеством оценок

  let averageMarks = findAverageMark(students);
  let quantityMarks = findMarksQuantity(students);
  anonceStatistic();

  function anonceStatistic() {
    compareMarks("maxAverageMarkStudent", averageMarks);
    compareMarks("minAverageMarkStudent", averageMarks);
    compareMarks("maxMarksAverageMarkStudent", quantityMarks);
  }

  function compareMarks(action, arr) {
    switch (action) {
      case "maxAverageMarkStudent":
        let maxIndex = 0;
        arr.reduce((max, cur, i) => {
          if (max > cur) {
            return max;
          } else {
            maxIndex = i;
            return (max = cur);
          }
        });
        return anoncePerson(maxIndex, "MAX average mark");
      case "minAverageMarkStudent":
        let minIndex = 0;
        arr.reduce((min, cur, i) => {
          if (min < cur) {
            return min;
          } else {
            minIndex = i;
            return (min = cur);
          }
        });
        return anoncePerson(minIndex, "MIN average mark");
      case "maxMarksAverageMarkStudent":
        let quantityIndex = 0;
        arr.reduce((max, cur, i) => {
          if (max > cur) {
            return max;
          } else {
            quantityIndex = i;
            return (max = cur);
          }
        });
        return anoncePerson(quantityIndex, "max Quantity of marks");
      default:
        alert("Something gone wrong!!!");
        break;
    }
  }

  function findAverageMark(arr) {
    let marks = arr.map((el) => {
      return averageStudentMark(el);
    });
    arr.forEach((el, i) => {
      el.averageMark = marks[i];
    });
    return marks;
  }
  function findMarksQuantity(arr) {
    let marks = arr.map((el) => {
      return el.marks.length;
    });
    arr.forEach((el, i) => {
      el.marksQuantity = marks[i];
    });
    return marks;
  }

  function anoncePerson(i, msg, path) {
    path =
      msg === "max Quantity of marks"
        ? students[i].marksQuantity
        : students[i].averageMark;
    alert(`${students[i].name} is student with ${msg}, which is ${path}`);
  }
}
