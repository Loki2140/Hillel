// Djghjcs
const toDoList = document.querySelector(".toDoList");
const task = document.querySelector(".task");
const taskField = task.querySelector("input");
const errorField = document.querySelector(".error");

// Events - Start
toDoList
  .querySelectorAll("li")
  .forEach((el) => el.addEventListener("click", onTaskClick));
document.getElementById("addTask").addEventListener("click", onAddTaskClick);
taskField.addEventListener("input", onTaskInput);
// Events - End

function onTaskClick(event) {
  const target = event.target;
  target.classList.toggle("green");
  target.classList.toggle("crossing");
}
function onAddTaskClick() {
  const newTask = getTask();
  const err = validateTask(newTask);
  return err ? showError(err) : (createEl(newTask), clearTaskField());
}

function createEl(task) {
  const el = document.createElement("li");
  el.innerHTML = task;
  // если хотим чтобы созданный элемент был желтый
  // el.classList.add("yellow");
  el.addEventListener("click", onTaskClick);
  toDoList.appendChild(el);
}

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
  if(value.Z)
  return value.length < 3 ? "Too few letters - Invalid Task" : null;
}
