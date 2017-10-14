// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://*/*
// @grant        none
// ==/UserScript==

var intervalId = 0;

(function() {
  'use strict';
  // Your code here...
  
  Push.create("EasyCrawler 检测到数据", {
      body: "Krowdster Backer",
      icon: 'https://raw.githubusercontent.com/toobigdata/EasyCrawler/master/app/images/logo.png',
      timeout: 5000,
      onClick: function () {
          window.focus();
          this.close();
      }
  });

  setTimeout(function(){
    crawlNextPage();
  }, 10*1000);

  var sidebar = document.createElement('div');
  sidebar.id = 'jz_crawl_btn';
  sidebar.style = 'z-index: 999; position: fixed; top: 40px; right: 0; background: green; padding: 10px;';
  sidebar.innerHTML = '<a style="color: #fff" class="btn" href="#" id="jz_crawl" title="">Auto Crawl</a>';
  document.body.appendChild(sidebar);
  $('#jz_crawl').click(function(){
		intervalId = setInterval(function(){
			crawlNextPage();
		}, 10*1000);
    console.log(intervalId);
    //alert('成功加入监测，监测期间请勿关闭页面。微信分钟级监测最多持续 2 小时。');
  });


})();

function crawl(){

  /*
  var data = Array.from(document.querySelectorAll('table.backers-table tr')).map(function(i){return i.innerHTML;});

  console.log(data);

  chrome.runtime.sendMessage({ 'msgtype': 'krowdster.backer', 'content': data}, function (response) {
    console.log(response);
  });
  */

}

function crawlNextPage(){
  document.querySelector('.g-recaptcha').style.display = 'block';

  var check = document.querySelector('.g-recaptcha');
  if(check && check.style.display === 'block') {
    console.log('captcha shown');
    clearInterval(intervalId);
  }
	var btn = document.querySelector('#wrapper > article > div.row.ng-scope > div.col-md-12 > div > div > div > div > div > div.row.backer-directory > div > div.text-center > ul > li:nth-last-child(1) > a');
	if(btn){
    btn.click();
    setTimeout(function(){
      crawl();
    }, 5*1000);
  }
}
