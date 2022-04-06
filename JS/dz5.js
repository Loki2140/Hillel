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

  function averageStudentMark(student) {
    let short = student.marks ? student.marks : student;
    return short.reduce((sum, val) => (sum += val)) / short.length;
  }
  function averageGroupMark(students) {
    let arr = students.map((el) => el.marks).flat(); // Also can be used .mapFlat();
    return averageStudentMark(arr);
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
}
