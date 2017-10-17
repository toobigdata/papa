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
      body: "微博用户数据",
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
  var counter = document.querySelectorAll('table.tb_counter .S_line1 strong');
  data.follow_num = counter[0].innerText;
  data.fan_num = counter[1].innerText;
  data.status_num = counter[2].innerText;
  data.screen_name = document.querySelector('h1.username').innerText;
  var info = document.querySelectorAll('li.li_1');
  data.info =Array.from(info).map(a=>a.innerText.replace('\n', ' '));

  console.log(data);

  chrome.runtime.sendMessage({ 'msgtype': 'weibo.user.info', 'content': data}, function (response) {
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

/******************************************************************************
 * 从当前页面内容中提取变量
 *****************************************************************************/
function getVar(index) {
  var content = document.body.innerHTML;
  console.log(content);
  var re = new RegExp('var ' + index + ' = (.*)$');
  var a = content.match(re);
  if (!a) return null;
  var a = a[0];
  if (!a) return null;

  return a;
  return a.substring(s + 1, e);
}
