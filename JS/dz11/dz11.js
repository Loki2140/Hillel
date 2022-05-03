//Variables
const ERROR_CLASS = "red";
const DEL_CLASS = "del";
const ITEM_CLASS = "toDoItem";
const TODO_ITEAM = document.getElementById("toDoItemTemplate").innerHTML;

const toDoList = document.querySelector(".toDoList");
const task = document.querySelector(".task");
const taskField = task.querySelector("input");
const errorField = document.querySelector(".error");
const toDoItems = [];

// Events - Start
toDoList.addEventListener("click", onTaskClick);
document.getElementById("addTask").addEventListener("click", onAddTaskClick);
taskField.addEventListener("input", onTaskInput);
// Events - End

function onTaskClick(event) {
  const target = event.target;
  if (target.classList.contains("del")) return del(e.target.parentElement);
  target.classList.toggle("green");
  target.classList.toggle("crossing");
}
function onAddTaskClick() {
  const newTask = getTask();
  const err = validateTask(newTask);
  return err ? showError(err) : (createEl(newTask), clearTaskField());
}
function createEl(task) {}

function onTaskInput() {
  const err = validateTask(getTask());
  return err ? showError(err) : clearError();
}
function showError(err) {
  errorField.textContent = err;
  taskField.classList.add("red");
}
function clearError() {
  errorField.textContent = "";
  taskField.classList.remove("red");
}
function clearTaskField() {
  taskField.value = null;
}
function getTask() {
  return taskField.value;
}

function validateTask(value) {
  if (value.trim().length === 0) return "Empty field, no spaces allowed!!!!";
  return value.length < 3 && "Too few letters - Invalid Task";
}

function addTask(value) {
  const toDoItem = createTableItem(value);
  toDoList.insertAdjacentHTML("beforeend", toDoItem);
}
function createTableItem(value) {
  return TODO_ITEAM.replace("{{value}}", value);
}
