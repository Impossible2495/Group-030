// ==UserScript==
// @name         firstYahooBot
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Bot for Bing
// @author       Abramov Ruslan
// @match        https://www.yahoo.com/*
// @match        https://www.search.yahoo.com/*
// @match        https://napli.ru/*
// @grant        none
// ==/UserScript==

let input = document.getElementsByName("p")[0];
let links = document.links;
let searchBtn = document.getElementById("ybar-search");
let keywords = ["Базовые вещи про GIT", "10 самых популярных шрифтов от Google", "Отключение редакций и ревизий в WordPress"];
let keyword = keywords[getRandom(0, keywords.length)];
let form = document.getElementById("ybar-sf");

form.removeAttribute("target");

if (searchBtn !== null) {

  input.value = keyword;
  searchBtn.click();

} else {
  for (let i = 0; i < links.length; i++) {
    if (links[i].href.includes("napli.ru")) {
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
