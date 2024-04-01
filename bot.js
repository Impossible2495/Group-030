// ==UserScript==
// @name         First Bot
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Bot for Bing
// @author       Abramov Ruslan
// @match        https://www.bing.com/*
// @match        https://napli.ru/*
// @grant        none
// ==/UserScript==

let searchInput = document.getElementsByName("q")[0];
let links = document.links;
let searchBtn = document.getElementById("search_icon");
let keywords = ["Базовые вещи про GIT", "10 самых популярных шрифтов от Google",
                "Отключение редакций и ревизий", "Webpack, Parcel и Rollup",
                "Вывод произвольных типов записей и полей"];
let keyword = keywords[getRandom(0, keywords.length)];

//Работаем на главной странице поисковика
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
}
//Работаем на целевом сайте
else if (location.hostname == "napli.ru") {
  console.log("Мы на napli.ru!!!");

  setInterval(()=> {
    let index = getRandom(0, links.length);
    let localLink = links[index];

    if (getRandom(0, 101) > 75) {
      location.href = "https://www.bing.com/";
    }

    if (localLink.href.includes("napli.ru")) {
      localLink.click();
    }
  }, getRandom(2000, 4000))

}
//Работаем на страницах поисковой выдачи
else if (document.querySelector(".b_scopebar") !== null) {
  let nextBingPage = true;
  for (let i = 0; i < links.length; i++) {
    if (links[i].href.indexOf("napli.ru") != -1) {
      let link = links[i];
      nextBingPage = false;
      console.log("Нашел строку " + link);
      setTimeout(()=> {
        link.click();
      }, getRandom(3000, 5000))
      break;
    }
  }
  if (document.querySelector(".sb_pagS").innerText == "5") {
    nextBingPage = false;
    location.href = "https://www.bing.com/";
  }
  if (nextBingPage) {
    setTimeout(()=>{
      document.querySelector(".sb_pagN").click();
    }, getRandom(2000, 4000))
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
