const ERROR_CLASS = "red";
const TABLE_ITEAM_TEMPLATE =
  document.getElementById("textTableTemplate").innerHTML;
const ERR_TEMPLATE = "<div> Empty field, no spaces allowed!!!!</div>";
const DEL_CLASS = "del";
const ITEM_CLASS = "trItem";
const STORAGE_KEY = "contactList";

const tbody = document.querySelector(".tbody");
const formContact = document.querySelector(".newContact");
const [firstName, surname, tel, button] = formContact;
const errorField = document.querySelector(".error");
let contactList = [];

button.addEventListener("click", onButtonClick);
tbody.addEventListener("click", onTaskClick);

init();
function init() {
  contactList = restoreData();
  renderItemList();
}

function renderItemList() {
  tbody.innerHTML = contactList
    .map((el) => interpolate(TABLE_ITEAM_TEMPLATE, el))
    .join("\n");
}
function interpolate(template, obj) {
  for (const key in obj) {
    template = template.replace(`{{${key}}}`, obj[key]);
  }
  return template;
}

function onButtonClick(e) {
  e.preventDefault();
  clearError();
  const newTrItem = getTrItem();
  const err = validateFields(firstName, surname, tel);
  if (err.includes(true)) {
    return showError();
  }
  addTrItem(newTrItem);
  resetForm();
}

function getTrItem() {
  const tr = {};
  tr.name = firstName.value;
  tr.surname = surname.value;
  tr.tel = tel.value;
  return tr;
}

function addTrItem(tr) {
  tr.id = Date.now();
  contactList.push(tr);
  saveData();
  renderItemList();
}
function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contactList));
}
function restoreData() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}
function onTaskClick(event) {
  const target = event.target;
  if (target.classList.contains(DEL_CLASS)) return itemDel(target);
}
function itemDel(el) {
  const itemId = getItemRowId(el);
  removeItem(itemId);
}
function removeItem(id) {
  contactList = contactList.filter((obj) => obj.id !== id);
  saveData();
  renderItemList();
}
function getItemRowId(el) {
  const tableItemId = el.closest("." + ITEM_CLASS);
  return +tableItemId.dataset.trId;
}
//
function resetForm() {
  formContact.reset();
}
function clearError() {
  errorField.textContent = "";
}
function showError() {
  errorField.insertAdjacentHTML("beforeend", ERR_TEMPLATE);
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
