"use strict";
const STICKER_ITEM_TEMPL = $("#labelTemplate").html();
// const STICKER_ITEM_TEMPL = document.getElementById("labelTemplate").innerHTML;
const STICKER_ITEM_CLASS = "stiker";
const STICKER_ITEM_ATTR = "id";
// const STICKER_ITEM_ATTR = "data-id";
const DEL_CLASS = "del";
const TEXTAREA_CLASS = "textarea";
const ADD_ID = "addSticker";

const URL_REQUEST_STICKERS =
  "https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/stickers/";

const $stikersPlacer = $(".stikersPlacer");
const $homework = $(".homework");
// const stikersPlacerEL = document.querySelector(".stikersPlacer");
// const homeworkEL = document.querySelector(".homework");

let stickersList = [];
const mainApi = new RestApi(URL_REQUEST_STICKERS);

$homework.on("click", "." + DEL_CLASS, itemDel);
$homework.on("click", "#" + ADD_ID, itemAdd);
$stikersPlacer.on("input", "." + TEXTAREA_CLASS, debounce(itemEdit));

// homeworkEL.addEventListener("click", onHomeworkELClick);
// stikersPlacerEL.addEventListener("input", debounce(onInput));

init();
function init() {
  loadData();
}

function loadData() {
  mainApi
    .loadList()
    .then((data) => {
      stickersList = data;
      renderItemList($stikersPlacer, STICKER_ITEM_TEMPL, stickersList);
    })
    .catch((err) => console.log(err));
}

function debounce(fn, timeout = 1000) {
  let timerId = null;
  return (...rest) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...rest), timeout);
  };
}
function renderItemList(block, template, list) {
  const html = list.map((el) => interpolate(template, el)).join("\n");
  block.html(html);
}
// function renderItem(block, template, el) {
//   const html = interpolate(template, el);
//   block.append(html);
// }

// function renderItemList(block, template, list) {
//   block.innerHTML = list.map((el) => interpolate(template, el)).join("\n");
// }

function interpolate(template, obj) {
  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      template = interpolate(template, obj[key]);
    }
    template = template.replaceAll(`{{${key}}}`, obj[key]);
  }
  return template;
}

// function onInput(event) {
//   const target = event.target;
//   if (target.classList.contains(TEXTAREA_CLASS)) return itemEdit(target);
// }
// function onHomeworkELClick(event) {
//   const target = event.target;
//   if (target.classList.contains(DEL_CLASS)) return itemDel(target);
//   if (target.id === ADD_ID) return itemAdd();
// }
function createNewEl() {
  const el = { description: "" };
  return el;
}

async function itemAdd() {
  const el = createNewEl();
  await mainApi.addItem(el).catch((err) => console.log(err));
  loadData();
}

async function itemDel(event) {
  const el = event.target;
  const itemId = getItemId(el, STICKER_ITEM_CLASS, STICKER_ITEM_ATTR);
  await mainApi.removeItem(itemId).catch((err) => console.log(err));
  loadData();
}

// async function itemDel(el) {
//   const itemId = getItemId(el, STICKER_ITEM_CLASS, STICKER_ITEM_ATTR);
//   await mainUrl.removeItem(itemId).catch((err) => console.log(err));
//   loadData();
// }

async function itemEdit(event) {
  const $el = $(event.target);
  const itemId = getItemId($el, STICKER_ITEM_CLASS, STICKER_ITEM_ATTR);
  let item = {};
  await mainApi.loadOneItem(itemId).then((el) => {
    item = $el;
  });
  if (item.description === $el.val()) return;
  item.description = $el.val();
  mainApi.editItem(itemId, item).catch((err) => console.log(err));
}
// async function itemEdit(event) {
//   const el = event.target;
//   const itemId = getItemId(el, STICKER_ITEM_CLASS, STICKER_ITEM_ATTR);
//   let item = {};
//   await mainApi.loadOneItem(itemId).then((el) => {
//     item = el;
//   });
//   if (item.description === el.value) return;
//   item.description = el.value;
//   mainApi.editItem(itemId, item).catch((err) => console.log(err));
// }

function getItemId(el, ItemClass, attr) {
  const $el = $(el);
  const $itemId = $el.closest("." + ItemClass);
  return +$itemId.data(attr);
}
// function getItemId(el, ItemClass, attr) {
//   const itemId = el.closest("." + ItemClass);
//   return +itemId.getAttribute(attr);
// }

// function itemDel2(el) {
//   const itemId = getItemId(el, STICKER_ITEM_CLASS, STICKER_ITEM_ATTR);
//   mainUrl
//     .removeItem(itemId)
//     .then((data) => {
//       mainUrl
//         .loadList()
//         .then((data) => {
//           stickersList = data;
//           renderItemList($stikersPlacer, STICKER_ITEM_TEMPL, stickersList);
//         })
//         .catch((err) => console.log(err));
//     })
//     .catch((err) => console.log(err));
// }
