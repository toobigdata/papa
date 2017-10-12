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
  setTimeout(function(){
    crawl();
  }, 3*1000);

})();

function crawl(){

  var data = {};
  data.url = location.href;
  data.title = document.querySelector('.product-title h1 a').innerText;
  var reviewList = document.querySelectorAll('#cm_cr-review_list .review');
  console.log(reviewList);

  for(var i=0;i<reviewList.length;i++){
    var item = reviewList[i].find('.a-row');
    console.log(item);
  }


  console.log(data);

  //chrome.runtime.sendMessage({ 'msgtype': 'amazon.com.product', 'content': data}, function (response) {
  chrome.runtime.sendMessage({ 'msgtype': 'test', 'content': data}, function (response) {
    console.log(response);
  });

}


