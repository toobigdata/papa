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

  var sidebar = document.createElement('div');
  sidebar.id = 'jz_crawl_btn';
  sidebar.style = 'z-index: 999; position: fixed; top: 40px; right: 0; background: green; padding: 10px;';
  sidebar.innerHTML = '<a style="color: #fff" class="btn" href="#" id="jz_crawl" title="">Auto Crawl</a>';
  document.body.appendChild(sidebar);
  $('#jz_crawl').click(function(){
		var intervalId = setInterval(function(){
			if(crawlNextPage() < 0){
        clearInterval(intervalId);
        alert('done');
      }
		}, 5*1000);
    //alert('成功加入监测，监测期间请勿关闭页面。微信分钟级监测最多持续 2 小时。');
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
    //.innerText.indexOf('系统限制');

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
