// const newContact = document.querySelector(".newContact");
const ERROR_CLASS = "red";
const DISABLED_CLASS = "red";
const TABLE_ITEAM = document.getElementById("textTableTemplate").innerHTML;

const tbody = document.querySelector(".tbody");
const [firstName, surname, tel, button] = document.querySelector(".newContact");
const errorField = document.querySelector(".error");

button.addEventListener("click", onButtonClick);
tbody.addEventListener("click", onDelClick);

function onButtonClick(e) {
  e.preventDefault();
  clearError();
  err = validateFields(firstName, surname, tel);
  if (err.includes(true)) {
    return showError();
  }
  addTableRow(firstName, surname, tel);
  clearFields(firstName, surname, tel);
}
function clearFields(...arr) {
  arr.forEach((el) => (el.value = ""));
}
function onDelClick(e) {
  if (e.target.classList.contains("del")) return del(e.target.parentElement);
}
function validateTask(value) {
  if (value.trim().length === 0) return;
}
function validateFields(...arr) {
  return arr.map((el) => validateField(el));
}
function validateField(el) {
  if (el.value.trim().length === 0) {
    el.classList.add(ERROR_CLASS);
    return true;
  } else {
    el.classList.remove(ERROR_CLASS);
    return false;
  }
}
function clearError() {
  errorField.textContent = "";
}
function del(el) {
  el.remove();
}
function showError() {
  errorField.insertAdjacentHTML(
    "beforeend",
    `<div> Empty field, no spaces allowed!!!!</div>`
  );
}
function addTableRow(firstName, surname, tel) {
  const tableItem = createTableItem(firstName.value, surname.value, tel.value);
  tbody.insertAdjacentHTML("beforeend", tableItem);
}
function createTableItem(firstName, surname, tel) {
  return TABLE_ITEAM.replace("{{name}}", firstName)
    .replace("{{surname}}", surname)
    .replace("{{tel}}", tel);
}
