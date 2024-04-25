// ==UserScript==
// @name         firstYandexBot
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Bot for Yandex
// @author       Abramov Ruslan
// @match        https://ya.ru/*
// @match        https://napli.ru/*
// @grant        none
// ==/UserScript==
//"Базовые вещи про GIT", "Отключение редакций и ревизий в WordPress"


let searchInput = document.getElementsByName("text")[0];
let links = document.links;
let searchBtn = document.getElementsByClassName("search3__button mini-suggest__button")[0];
let keywords = ["napli.ru"];
let keyword = keywords[getRandom(0, keywords.length)];


if (searchBtn !== undefined) {
  let i = 0;
  let timerId = setInterval(() => {
    searchInput.value += keyword[i];
    i++;
    if (i == keyword.length) {
      clearInterval(timerId);
      searchBtn.click();
    }
  }, 500);


} else {
  for (let i = 0; i < links.length; i++) {
    if (links[i].href.includes("https://napli.ru")) {
      let link = links[i];
      link.click();
      break;
    }
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
