"use strict";
const STICKER_ITEM_TEMPL = document.getElementById("labelTemplate").innerHTML;
const STICKER_ITEM_CLASS = "stiker";
const STICKER_ITEM_ATTR = "data-id";
const DEL_CLASS = "del";
const ADD_ID = "addSticker";

const TEXTAREA_CLASS = "textarea";

const URL_REQUEST_STICKERS =
  "https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/stickers/";

const stikersPlacer = document.querySelector(".stikersPlacer");
const homework = document.querySelector(".homework");

let stickersList = [];
const mainUrl = new RestApi(URL_REQUEST_STICKERS);

homework.addEventListener("click", onHomeworkClick);
stikersPlacer.addEventListener("focusout", onFocusout);

init();
function init() {
  loadData();
}

function loadData() {
  mainUrl
    .loadList()
    .then((data) => {
      stickersList = data;
      renderItemList(stikersPlacer, STICKER_ITEM_TEMPL, stickersList);
    })
    .catch((err) => console.log(err));
}
function renderItemList(block, template, list) {
  block.innerHTML = list.map((el) => interpolate(template, el)).join("\n");
}
function interpolate(template, obj) {
  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      template = interpolate(template, obj[key]);
    }
    template = template.replaceAll(`{{${key}}}`, obj[key]);
  }
  return template;
}

function onFocusout(event) {
  const target = event.target;
  if (target.classList.contains(TEXTAREA_CLASS)) return itemEdit(target);
}

function onHomeworkClick(event) {
  const target = event.target;
  if (target.classList.contains(DEL_CLASS)) return itemDel(target);
  if (target.id === ADD_ID) return itemAdd();
}
function createNewEl() {
  const el = { description: "" };
  return el;
}

async function itemAdd() {
  const el = createNewEl();
  await mainUrl.addItem(el).catch((err) => console.log(err));
  loadData();
}

async function itemDel(el) {
  const itemId = getItemId(el, STICKER_ITEM_CLASS, STICKER_ITEM_ATTR);
  await mainUrl.removeItem(itemId).catch((err) => console.log(err));
  loadData();
}

async function itemEdit(el) {
  const itemId = getItemId(el, STICKER_ITEM_CLASS, STICKER_ITEM_ATTR);
  let item = {};
  await mainUrl.loadOneItem(itemId).then((el) => {
    item = el;
  });
  if (item.description === el.value) return;
  item.description = el.value;
  mainUrl.editItem(itemId, item).catch((err) => console.log(err));
}

function getItemId(el, ItemClass, attr) {
  const itemId = el.closest("." + ItemClass);
  return +itemId.getAttribute(attr);
}

// function itemDel2(el) {
//   const itemId = getItemId(el, STICKER_ITEM_CLASS, STICKER_ITEM_ATTR);
//   mainUrl
//     .removeItem(itemId)
//     .then((data) => {
//       mainUrl
//         .loadList()
//         .then((data) => {
//           stickersList = data;
//           renderItemList(stikersPlacer, STICKER_ITEM_TEMPL, stickersList);
//         })
//         .catch((err) => console.log(err));
//     })
//     .catch((err) => console.log(err));
// }
