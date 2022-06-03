"use strict";
const TABLE_ITEM_TEMPL = $("#textTableTemplate").html();
const BLOCK_IMG_TEMPL = $("#imgBlockItem").html();
// const IMG_ITEM_TEMPL = document.getElementById("imgBigItem").innerHTML;
const URL_REQUEST_ALBUMS = "https://jsonplaceholder.typicode.com/albums/";
const URL_REQUEST_ALBUM =
  "https://jsonplaceholder.typicode.com/photos?albumId=";
const HEADERS = { "Content-Type": "application/json" };
const ALBUM_ITEM_CLASS = "trItem";
const IMG_ITEM_CLASS = "flexImg";
const BIG_IMG_ITEM_CLASS = "bigImg";
const ALBUM_ITEM_ATTR = "data-tr-id";
const IMG_ITEM_ATTR = "data-img-id";

const albumsBlock = $(".tbody");
const imgBlock = $(".imgBlock");

let albumList = [];
let imgList = [];
const albumListApi = new RestApi();

albumsBlock.on("click", onAlbumsClick);

init();
function init() {
  albumListApi
    .loadList(URL_REQUEST_ALBUMS)
    .then((data) => {
      albumList = data;
      renderItemList(albumsBlock, TABLE_ITEM_TEMPL, albumList);
      albumListApi
        .loadOneItem(URL_REQUEST_ALBUM, albumList[0].id)
        .then((data) => {
          imgList = data;
          renderItemList(imgBlock, BLOCK_IMG_TEMPL, imgList);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

function renderItemList(block, template, list) {
  const html = list.map((el) => interpolate(template, el)).join("\n");
  block.html(html);
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
      getItemId(target, ALBUM_ITEM_CLASS, ALBUM_ITEM_ATTR)
    )
    .then((data) => {
      imgList = data;
      renderItemList(imgBlock, BLOCK_IMG_TEMPL, imgList);
    })
    .catch((err) => console.log(err));
}

function getItemId(el, ItemClass, attr) {
  const $el = $(el);
  const $itemId = $el.closest("." + ItemClass);
  return +$itemId.data(attr);
}

// function onImgClick(event) {
//   const target = event.target;
//   const id = getItemId(target, IMG_ITEM_CLASS, IMG_ITEM_ATTR);
//   const item = [imgList.find((el) => el.id === id)];
//   document.body.insertAdjacentHTML(
//     "beforeend",
//     interpolate(IMG_ITEM_TEMPL, item)
//   );
//   const bigBlock = document.querySelector(".bigImg");
//   bigBlock.addEventListener("click", delBigImg);
// }
// function delBigImg() {
//   document.querySelector(".bigImg").remove(); // Если пропадает блок, то и иветн пропадает? Ведь блока нет, не зачем следить?
// }
