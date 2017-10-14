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
      body: "Kickstater 评论数据",
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

  var sidebar = document.createElement('div');
  sidebar.id = 'jz_crawl_btn';
  sidebar.style = 'z-index: 999; position: fixed; top: 40px; right: 0; background: green; padding: 10px;';
  sidebar.innerHTML = '<a style="color: #fff" class="btn" href="#" id="jz_crawl" title="">Auto Crawl</a>';
  document.body.appendChild(sidebar);
  $('#jz_crawl').click(function(){
		setInterval(function(){
			crawlNextPage();
		}, 5*1000);
    //alert('成功加入监测，监测期间请勿关闭页面。微信分钟级监测最多持续 2 小时。');
  });


})();

function crawl(){

  var data = {};
  data.url = location.href;
  data.title = document.querySelector('h2.project-profile__title a').innerText;
  //var reviewList = Array.from(document.querySelectorAll('#cm_cr-review_list .review'));
  //console.log(reviewList);

  var all = Array.from(document.querySelectorAll('.list-comments .comment-inner'));
  data.comment_list = all.slice(all.length - 50, all.length).map(function(d){
    return {
      author_name: d.querySelector('h3 a.author').innerText,
      author_link: d.querySelector('h3 a.author').href,
      date: d.querySelector('.date a data').innerText,
      content: d.querySelector('p').innerText,
    }
  });

  console.log(data);

  chrome.runtime.sendMessage({ 'msgtype': 'kickstater.project.comment', 'content': data}, function (response) {
    console.log(response);
  });

}

function crawlNextPage(){
	var btn = document.querySelector('a.older_comments');
	if(btn){
    btn.click();
    setTimeout(function(){
      crawl();
    }, 1*1000);
  }
}
