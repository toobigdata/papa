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
  Push.create("EasyCrawler 检测到数据", {
      body: "京东商品数据",
      icon: 'https://raw.githubusercontent.com/toobigdata/EasyCrawler/master/app/images/logo.png',
      timeout: 5000,
      onClick: function () {
          window.focus();
          this.close();
      }
  });
  setTimeout(function(){
    crawl();
  }, 3*1000);

})();

function crawl(){

  var data = {};
  data.url = location.href;
  data.title = document.querySelector('.sku-name').innerText;
  data.price = document.querySelector('.price').innerText;
  data.commentCount = document.querySelector('.comment-count .count').innerText;
  console.log(data);

  chrome.runtime.sendMessage({ 'msgtype': 'jd.product', 'content': data}, function (response) {
    //console.log(response);
  });

}


