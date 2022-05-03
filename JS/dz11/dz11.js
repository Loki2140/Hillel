const ERROR_CLASS = "red";
const DEL_CLASS = "del";
const ITEM_CLASS = "toDoItem";
const GREEN_CLASS = "green";
const CROSSING_CLASS = "crossing";
const ERR_TEMPLATE = [
  "Empty field, no spaces allowed!!!!",
  "Too few letters - Invalid Task"
];
const TODO_TEMPLATE = document.getElementById("toDoItemTemplate").innerHTML;

const toDo = document.querySelector(".toDo");
const toDoList = document.querySelector(".toDoList");
const errorField = document.querySelector(".error");
let toDoItems = [
  {
    id: 111,
    task: "Купить хлеб",
    err: false,
    done: false
  }
]; // Выступакт в роли нашего сервера, коллекция с объектами.

// В текущей работе использовал обращение Form.name (toDo.task и toDo.addTask) не знаю правильно ли это, на уроке мы этот сопособ не упоминали. А работали чере селектор  querySelectorAll(название класса импутов)

// Events - Start
toDoList.addEventListener("click", onTaskClick);
toDo.addTask.addEventListener("click", onAddTaskClick);
// toDo.newTask.addEventListener("input", onTaskInput);
// Events - End

// Add default task
addTask({
  task: "Купить молоко",
  err: false,
  done: false
});

//Render
function init() {
  renderItemList();
}

function renderItemList() {
  toDoList.innerHTML = toDoItems
    .map((el) => interpolate(TODO_TEMPLATE, el))
    .join("\n");
}

function onAddTaskClick(e) {
  e.preventDefault();

  const newTask = getTask();
  if (newTask.err) {
    showError(newTask.err);
  } else {
    clearError();
    addTask(newTask);
    resetForm();
  }
}
function onTaskClick(event) {
  const target = event.target;
  if (target.classList.contains(ITEM_CLASS)) return itemToggel(target);
  if (target.classList.contains(DEL_CLASS)) return itemDel(target);
}

function resetForm() {
  toDo.reset();
}
// Get, Create task
function getTask() {
  const task = {};
  task.task = toDo.newTask.value;
  task.err = validateTask(toDo.newTask.value);
  task.done = false;
  return task;
}
function addTask(newTask) {
  newTask.id = Date.now();
  toDoItems.push(newTask);
  renderItemList();
}

function interpolate(template, obj) {
  for (const key in obj) {
    template = template.replace(`{{${key}}}`, obj[key]);
  }
  return template;
}

// Toggel item
function itemToggel(el) {
  const itemId = getItemRowId(el);
  const index = toDoItems.findIndex((obj) => obj.id === itemId);
  if (toDoItems[index].done === false) {
    toDoItems[index].done = true;
    // // мне кажеться что данный метод не совсем правильный, тк я хоть и изменяю дату, но взаимодействую с дом напрямую, а не через дата. т.е. не делаю перерендер с учетом даты
    el.classList.add(GREEN_CLASS);
    el.classList.add(CROSSING_CLASS);
  } else {
    toDoItems[index].done = false;
    el.classList.remove(GREEN_CLASS);
    el.classList.remove(CROSSING_CLASS);
  }
}
// Del item
function itemDel(el) {
  const itemId = getItemRowId(el);
  removeItem(itemId);
}
function removeItem(id) {
  toDoItems = toDoItems.filter((obj) => obj.id !== id);
  renderItemList();
}
//Id
function getItemRowId(el) {
  const todoItemId = el.closest("." + ITEM_CLASS);
  return +todoItemId.dataset.todoitemid;
}
// Error and Validate
function validateTask(value) {
  if (value.trim().length === 0) return ERR_TEMPLATE[0];
  return value.length < 3 && ERR_TEMPLATE[1];
}
function showError(err) {
  errorField.textContent = err;
  toDo.newTask.classList.add(ERROR_CLASS);
}
function clearError() {
  errorField.textContent = "";
  toDo.newTask.classList.remove(ERROR_CLASS);
}

// Error on Input
// function onTaskInput() {
//   const err = validateTask(toDo.newTask.value);
//   return err ? showError(err) : clearError();
// }
