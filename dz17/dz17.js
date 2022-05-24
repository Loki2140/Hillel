"use strict";
const TABLE_ITEM_TEMPL = document.getElementById("textTableTemplate").innerHTML;
const BLOCK_IMG_TEMPL = document.getElementById("imgBlockItem").innerHTML;
const IMG_ITEM_TEMPL = document.getElementById("imgBigItem").innerHTML;
imgBigItem;
const URL_REQUEST_ALBUMS = "https://jsonplaceholder.typicode.com/albums/";
const URL_REQUEST_ALBUM =
  "https://jsonplaceholder.typicode.com/photos?albumId=";
const HEADERS = { "Content-Type": "application/json" };
const ALBUM_ITEM_CLASS = "trItem";
const IMG_ITEM_CLASS = "flexImg";
const BIG_IMG_ITEM_CLASS = "bigImg";
const ALBUM_ITEM_ATTR = "data-tr-id";
const IMG_ITEM_ATTR = "data-img-id";

const albumsBlock = document.querySelector(".tbody");
const imgBlock = document.querySelector(".imgBlock");

let albumList = [];
let imgList = [];
const albumListApi = new RestApi();

albumsBlock.addEventListener("click", onAlbumsClick);
imgBlock.addEventListener("click", onImgClick);

init();
function init() {
  albumListApi
    .loadList(URL_REQUEST_ALBUMS)
    .then((data) => {
      albumList = data;
      renderItemList(albumsBlock, TABLE_ITEM_TEMPL, albumList);
    })
    .catch((err) => console.log(err));

  albumListApi
    .loadOneItem(URL_REQUEST_ALBUM)
    .then((data) => {
      imgList = data;
      renderItemList(imgBlock, BLOCK_IMG_TEMPL, imgList);
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

function onAlbumsClick(event) {
  const target = event.target;
  albumListApi
    .loadOneItem(
      URL_REQUEST_ALBUM,
      getItemId(target, ALBUM_ITEM_CLASS, ALBUM_ITEM_ATTR) //Не уверен что так стоит передавать атрибут, но в таком варианте функция становится универсальной, мне просто неужно отдельно передавать тот атрибут который я жедаю найти
    )
    .then((data) => {
      imgList = data;
      renderItemList(imgBlock, BLOCK_IMG_TEMPL, imgList);
    })
    .catch((err) => console.log(err));
}
function getItemId(el, ItemClass, attr) {
  const tableItemId = el.closest("." + ItemClass);
  return +tableItemId.getAttribute(attr);
}

function onImgClick(event) {
  const target = event.target;
  const id = getItemId(target, IMG_ITEM_CLASS, IMG_ITEM_ATTR);
  const item = [imgList.find((el) => el.id === id)];
  document.body.insertAdjacentHTML(
    "beforeend",
    interpolate(IMG_ITEM_TEMPL, item)
  );
  const bigBlock = document.querySelector(".bigImg");
  bigBlock.addEventListener("click", delBigImg);
}
function delBigImg() {
  document.querySelector(".bigImg").remove(); // Если пропадает блок, то и иветн пропадает? Ведь блока нет, не зачем следить?
}
