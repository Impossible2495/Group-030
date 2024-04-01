// ==UserScript==
// @name         First Bot
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Bot for Bing
// @author       Abramov Ruslan
// @match        https://www.bing.com/*
// @grant        none
// ==/UserScript==

let searchInput = document.getElementsByName("q")[0];
let links = document.links;
let searchBtn = document.getElementById("search_icon");
let keywords = ["Базовые вещи про GIT", "10 самых популярных шрифтов от Google", "Отключение редакций и ревизий в WordPress"];
let keyword = keywords[getRandom(0, keywords.length)];


if (searchBtn !== null) {
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
    if (links[i].href.indexOf("napli.ru") != -1) {
      let link = links[i];
      console.log("Нашел строку " + link);
      link.click();
      break;
    }
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
