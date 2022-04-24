//Variables
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
  return err ? showError(err) : (createEl(newTask), clearTaskField()); // Я уже понял, что тренарник не дорлжен возвращать действие и это не совсем верно, такой себе +/-. А можно ли передавать в return несколько действий в круглых скобках. На сколько я понял это не есть ошибка? И нужно ли возвращать что либо? По сути можно без ретурна и тренарника, но запись будет длинее.
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
// Попробовал такую запись ниже, чисто в образовательных целях. Жду комментарий насколько это валидно, можно ли таким пользоваться?  получается что мы возвращаем либо Error c розличным содержимым, либор Error = false.
function validateTask(value) {
  if (value.trim().length === 0) return "Empty field, no spaces allowed!!!!";
  return value.length < 3 && "Too few letters - Invalid Task";
}
