"use strict";
const ERROR_CLASS = "red";
const TABLE_ITEAM_TEMPLATE =
  document.getElementById("textTableTemplate").innerHTML;
const ERR_TEMPLATE = "<div> Empty field, no spaces allowed!!!!</div>";
const DEL_CLASS = "del";
const ITEM_CLASS = "trItem";
const STORAGE_KEY = "contactList";
const URL_REQUEST = "https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/users/";
const HEADERS = { "Content-Type": "application/json" };

const contactBody = document.querySelector(".tbody");
const formContact = document.querySelector(".newContact");
const [firstName, email, phone, button] = formContact; //обсуждали что способ не совсем верный, но уже не стал исправлять.
const errorField = document.querySelector(".error");
let contactList = [];
let contact = {};

button.addEventListener("click", onButtonClick);
contactBody.addEventListener("click", onContactClick);

init();

function init() {
  loadList();
}
// ДЗ16 Начало ----------------------------------------------------

function sendRequest(url, method = "GET", body = null) {
  return fetch(url, {
    method: method,
    body: body != null ? JSON.stringify(body) : null,
    headers: HEADERS
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    // до конца не разобрался с ошибками, и синтаксисом THORW - CATCH, и пока что совсем не понял нужен ли THORW чтобы что-то CATCH
    return response.json().then((error) => {
      const err = new Error("Что-то пошло не так!");
      err.date = error;
      throw err;
    });
  });
}

function loadList() {
  sendRequest(URL_REQUEST)
    .then((data) => {
      contactList = data;
      renderItemList();
    })
    .catch((err) => console.log(err));
}
function addItem(tr) {
  sendRequest(URL_REQUEST, "POST", tr)
    .then((data) => loadList())
    .catch((err) => console.log(err));
}
function removeItem(id) {
  sendRequest(URL_REQUEST + id, "DELETE")
    .then((data) => {
      loadList();
    })
    .catch((err) => console.log(err));
}
// Использовал async, потому что столкнулся с проблемой в редактирование данных с сервера. В моей реализации они приходили с опозданием. И contact = undefind.
// Вот тут уже нужен async и await
async function loadOneItem(id) {
  await sendRequest(URL_REQUEST + id)
    .then((data) => (contact = data))
    .catch((err) => console.log(err));
}
function editItem(task) {
  sendRequest(URL_REQUEST + task.id, "PUT", task)
    .then((data) => loadList())
    .catch((err) => console.log(err));
}
// Вот тут тоже уже нужен async и await. Почему именно в двух местах на момент написания ДЗ еще не разобрался.
async function initEdit(el) {
  if (getItemRowId(el) === contact.id) {
    button.innerHTML = "Add Task";
    resetForm();
    return (contact = {});
  }
  await loadOneItem(getItemRowId(el));
  firstName.value = contact.name;
  email.value = contact.email;
  phone.value = contact.phone;
  button.innerHTML = "Edit";
}

function onButtonClick(e) {
  e.preventDefault();
  clearError();
  const newTrItem = getRowItem(contact.id);
  const err = validateFields(firstName, email, phone);
  if (err.includes(true)) {
    return showError();
  }
  contact = {};
  button.innerHTML = "Add Task";
  if (!newTrItem.id) {
    addItem(newTrItem);
  } else {
    editItem(newTrItem);
  }
  resetForm();
}
function getRowItem(id) {
  const tr = {};
  if (id) {
    tr.id = id;
  }
  tr.name = firstName.value;
  tr.email = email.value;
  tr.phone = phone.value;
  return tr;
}

// ДЗ16 Конец ----------------------------------------------------

function renderItemList() {
  contactBody.innerHTML = contactList
    .map((el) => interpolate(TABLE_ITEAM_TEMPLATE, el))
    .join("\n");
}

function interpolate(template, obj) {
  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      template = interpolate(template, obj[key]);
    }
    template = template.replace(`{{${key}}}`, obj[key]);
  }
  return template;
}

function onContactClick(event) {
  const target = event.target;
  if (target.classList.contains(DEL_CLASS)) return itemDel(target);
  if (!target.classList.contains(DEL_CLASS)) return initEdit(target);
}
function itemDel(el) {
  const itemId = getItemRowId(el);
  removeItem(itemId);
}

function getItemRowId(el) {
  const tableItemId = el.closest("." + ITEM_CLASS);
  return tableItemId.dataset.trId;
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
