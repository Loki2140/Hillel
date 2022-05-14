const ERROR_CLASS = "red";
const TABLE_ITEAM_TEMPLATE =
  document.getElementById("textTableTemplate").innerHTML;
const ERR_TEMPLATE = "<div> Empty field, no spaces allowed!!!!</div>";
const DEL_CLASS = "del";
const ITEM_CLASS = "trItem";
const STORAGE_KEY = "contactList";

const contactBody = document.querySelector(".tbody");
const formContact = document.querySelector(".newContact");
const [firstName, email, phone, address, button] = formContact;
const errorField = document.querySelector(".error");
let contactList = [];

button.addEventListener("click", onButtonClick);
contactBody.addEventListener("click", onContactClick);

init();
function init() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((data) => {
      contactList = data;
      renderItemList();
    });
}

function renderItemList() {
  contactBody.innerHTML = contactList
    .map((el) => interpolate(TABLE_ITEAM_TEMPLATE, el))
    .join("\n");
}
// ДЗ 15 НАЧАЛО
// Попытался сделать универсальный способ, чтобы можно было вытягивать сколько угодно свойств как бы глубоко они не находились.
// Да долго с учетом перебора, но универсально, можно расширять нашу таблицу дальше, главное обновлять шаблон.
function interpolate(template, obj) {
  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      template = interpolate(template, obj[key]);
    }
    template = template.replace(`{{${key}}}`, obj[key]);
  }
  return template;
}
// ДЗ 15 Конец

function onButtonClick(e) {
  e.preventDefault();
  clearError();
  const newTrItem = getRowItem();
  const err = validateFields(firstName, email, phone, address);
  if (err.includes(true)) {
    return showError();
  }
  addRowItem(newTrItem);
  resetForm();
}

function getRowItem() {
  const tr = {};
  tr.name = firstName.value;
  tr.email = email.value;
  tr.phone = phone.value;
  //  По сути костыль, но ничего лучше не придумал. Если street не указано через пробел, на его месте будет пустая строка.
  const [city, street] = address.value.split(" ");
  tr.address = { city: city, street: street ? street : "" };
  return tr;
}

function addRowItem(tr) {
  tr.id = Date.now();
  contactList.push(tr);
  // saveData();
  renderItemList();
}

// function saveData() {
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(contactList));
// }
// function restoreData() {
//   const data = localStorage.getItem(STORAGE_KEY);
//   return data ? JSON.parse(data) : [];
// }

function onContactClick(event) {
  const target = event.target;
  if (target.classList.contains(DEL_CLASS)) return itemDel(target);
}
function itemDel(el) {
  const itemId = getItemRowId(el);
  removeItem(itemId);
}
function removeItem(id) {
  contactList = contactList.filter((obj) => obj.id !== id);
  // saveData();
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
