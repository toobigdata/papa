// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://*/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  // Your code here...
	crawl();

})();

function crawl(){

  var data = {};
  data.url = location.href;
  data.title = document.querySelector('.article-box > h1.article-title').innerText;
  data.author = document.querySelector('.user-card-name > a').innerText;
  data.author_url = document.querySelector('.user-card-name > a').href;
  data.comment_num = document.querySelector('#comment > div.c-header > em').innerText.replace(',', '');
  data.create_time = document.querySelector('.article-sub > span:nth-last-child(1)').innerText;
  //console.log(data);

  /*
  chrome.runtime.sendMessage({ 'msgtype': 'toutiao.article', 'content': data}, function (response) {
    console.log(response);
  });
  */

}


