"use strict";
const SIZE_SMALL = {
  price: 50,
  callories: 20
};
const SIZE_MIDL = {
  price: 75,
  callories: 30
};
const SIZE_BIG = {
  price: 100,
  callories: 40
};
const TOP_CHEESE = {
  price: 10,
  callories: 20
};
const TOP_SALAT = {
  price: 20,
  callories: 5
};
const TOP_POTATO = {
  price: 15,
  callories: 10
};
const TOP_SPICE = {
  price: 15,
  callories: 0
};
const TOP_MAYO = {
  price: 20,
  callories: 5
};

class Hamburger {
  constructor(obj) {
    ({ price: this._price, callories: this._callories } = obj); // Задать на лекции вопрос про деструкторизацию. Object.assign(this, obj) Почему со скобками работает а без нет? 
  }
  getPrice() {
    return this._price;
  }
  getCallories() {
    return this._callories;
  }
  setPrice() {}
  addTopping(obj) {
    const { price, callories } = obj; // насколько это верно? создавать переменную в Классе или в методе класса?
    this._price += price;
    this._callories += callories;
  }
  removeTopping(obj) {
    const { price, callories } = obj;
    this._price -= price;
    this._callories -= callories;
  }
}

const hamburger = new Hamburger(SIZE_SMALL);

hamburger.addTopping(TOP_MAYO);
hamburger.addTopping(TOP_POTATO);
console.log("Price with toppings:" + hamburger.getPrice());
console.log("Callories with toppings:" + hamburger.getCallories());
hamburger.removeTopping(TOP_POTATO);
hamburger.removeTopping(TOP_MAYO);
console.log("Price without toppings:" + hamburger.getPrice());
console.log("Callories without toppings:" + hamburger.getCallories());
