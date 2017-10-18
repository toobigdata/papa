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
      body: "微博用户关注数据",
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

  var crawl_btn = document.createElement('div');
  crawl_btn.id = 'jz_crawl';
  crawl_btn.className = 'jz_btn';
  crawl_btn.innerHTML = '自动翻页爬数';
  document.querySelector('#jz_sidebar .sidebar-body').appendChild(crawl_btn);

  var autoreload_btn = document.createElement('div');
  autoreload_btn.id = 'autoreload';
  autoreload_btn.className = 'jz_btn';
  autoreload_btn.innerHTML = '自动刷新';
  document.querySelector('#jz_sidebar .sidebar-body').appendChild(autoreload_btn);

  $('#jz_crawl').click(function(){
		var intervalId = setInterval(function(){
			if(crawlNextPage() < 0){
        clearInterval(intervalId);
        alert('done');
      }
		}, 5*1000);
  });

  $('#autoreload').click(function(){
    minuteReload();
  });

})();

function crawl(){

  var data = {};
  data.url = location.href;
  var followList = document.querySelectorAll('.follow_list li.follow_item');
  data.follow_list = Array.from(followList).map(function(d){
    var r = {};
    r.data = d.getAttribute('action-data');
    if(r.data){
      var sp = r.data.split('&');
      r.uid = sp[0].replace('uid=', '');
      r.nickname = sp[0].replace('fnick=', '');
      r.gender = sp[2].replace('sex=', '');
    }
    r.link = d.querySelector('.mod_pic a').href;
    r.avatar = d.querySelector('.mod_pic a img').src;
    var number = d.querySelectorAll('.info_connect span.conn_type .count');
    r.follow_num =  number[0].innerText;
    r.fan_num =  number[1].innerText;
    r.status_num =  number[2].innerText;
    r.address = d.querySelector('.info_add span').innerText;
    r.intro = d.querySelector('.info_intro span')?d.querySelector('.info_intro span').innerText:'';
    r.source = d.querySelector('.info_from').innerText;
    return r;
  });
  console.log(data);

  chrome.runtime.sendMessage({ 'msgtype': 'weibo.user.follow', 'content': data}, function (response) {
    console.log(response);
  });
}

function crawlNextPage(){

  var btn = document.querySelector('a.page.next');
	if(btn != null){
    btn.click();
    var limit = document.querySelector('.layer_point .point p');
    if(limit) return -1;
    setTimeout(function(){
      crawl();
      return 1;
    }, 1*1000);
  } else {
    return -1;
  }
}
