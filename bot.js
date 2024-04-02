// ==UserScript==
// @name         First Bot
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Bot for Bing
// @author       Abramov Ruslan
// @match        https://www.bing.com/*
// @match        https://napli.ru/*
// @match        https://kiteuniverse.ru/*
// @match        https://motoreforma.com/*
// @grant        none
// ==/UserScript==

let searchInput = document.getElementsByName("q")[0];
let links = document.links;
let searchBtn = document.getElementById("search_icon");

let sites = {
  "napli.ru": ["Базовые вещи про GIT", "10 самых популярных шрифтов от Google",
               "Отключение редакций и ревизий", "Webpack, Parcel и Rollup",
               "Вывод произвольных типов записей и полей"],
  "kiteuniverse.ru": ["Красота. Грация. Интеллект", "Kite Universe  Россия",
                      "Мастер классы Кайт"],
  "motoreforma.com": ["тюнинг Maverick X3", "вариатор CV-Tech", "прошивки CAN-AM"]
}

let sitesKeys = Object.keys(sites);
let sitesLength = sitesKeys.length;
let site = sitesKeys[getRandom(0, sitesLength)];

let keywords = sites[site];
let keyword = keywords[getRandom(0, keywords.length)];

//Работаем с cookie
if (searchBtn !== null) {
  document.cookie = `site=${site}`;
} else if (location.hostname == "www.bing.com") {
  site = getCookie("site");
} else {
  site = location.hostname;
}

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
else if (location.hostname == site) {
  console.log("Мы на целевом сайте --> " + site);

  setInterval(()=> {
    let index = getRandom(0, links.length);
    let localLink = links[index];

    if (getRandom(0, 101) > 75) {
      location.href = "https://www.bing.com/";
    }

    if (localLink.href.includes(site)) {
      localLink.click();
    }
  }, getRandom(2000, 4000))

}
//Работаем на страницах поисковой выдачи
else if (document.querySelector(".b_scopebar") !== null) {
  let nextBingPage = true;
  for (let i = 0; i < links.length; i++) {
    if (links[i].href.indexOf(site) != -1) {
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

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
