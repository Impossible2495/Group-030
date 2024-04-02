// ==UserScript==
// @name         firstYandexBot
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Bot for Yandex
// @author       Abramov Ruslan
// @match        https://ya.ru/*
// @match        https://napli.ru/*
// @grant        none
// ==/UserScript==
//"Базовые вещи про GIT", "Отключение редакций и ревизий в WordPress"
let input = document.getElementById("text");
let links = document.links;
let searchBtn = document.getElementsByClassName("search3__button")[0];
let keywords = ["napli.ru"];
let keyword = keywords[getRandom(0, keywords.length)];

//form.removeAttribute("target");

if (searchBtn !== undefined) {
  input.value = keyword;
  searchBtn.click();

} else {
  for (let i = 0; i < links.length; i++) {
    if (links[i].href.includes("napli.ru")) {
      let link = links[i];
      console.log("Нашел строку " + link);
      link.removeAttribute("target");
      link.click();
      break;
    }
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
