// ==UserScript==
// @name         firstYandexBot
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Bot for Yandex
// @author       Abramov Ruslan
// @match        https://ya.ru/*
// @match        https://napli.ru/*
// @match        https://kiteuniverse.ru/*
// @match        https://motoreforma.com/*
// @grant        none
// ==/UserScript==
//"Базовые вещи про GIT", "Отключение редакций и ревизий в WordPress"


let searchInput = document.getElementsByName("text")[0];
let links = document.links;
let searchBtn = document.getElementsByClassName("search3__button mini-suggest__button")[0];


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
if (searchBtn !== undefined) {
  document.cookie = `site=${site}`;
} else if (location.hostname == "ya.ru") {
  site = getCookie("site");
} else {
  site = location.hostname;
}

//Работаем на главной странице поисковика
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
}
//Работаем на целевом сайте
else if (location.hostname == site) {
  console.log("Мы на целевом сайте --> " + site);

  setInterval(()=> {
    let index = getRandom(0, links.length);
    let localLink = links[index];

    if (getRandom(0, 101) > 75) {
      location.href = "https://ya.ru";
    }

    if (localLink.href.includes(site)) {
      localLink.click();
    }
  }, getRandom(2000, 4000))

}
//Работаем на страницах поисковой выдачи
else if (document.querySelector(".HeaderDesktop-Navigation") !== undefined) {
  let nextYaPage = true;
  for (let i = 0; i < links.length; i++) {
    if (links[i].href.indexOf(site) != -1) {
      let link = links[i];
      nextYaPage = false;
      console.log("Нашел строку " + link);
      setTimeout(()=> {
        link.click();
      }, getRandom(3000, 5000))
      break;
    }
  }
  if (document.querySelector(".Pager-Item_current").innerText == "5") {
    nextYaPage = false;
    location.href = "https://www.ya.ru";
  }
  if (nextYaPage) {
    setTimeout(()=>{
      document.querySelector(".Pager-Item_type_next").click();
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
