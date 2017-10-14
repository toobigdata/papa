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
      body: "Kickstater 用户数据",
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
  console.log(getVar('color_map'));

  var data = {};
  data.url = location.href;
  data.avatar = document.querySelector('#profile_avatar a img').src;
  data.name = document.querySelector('.profile_bio h2 a').innerText; data.backed_num = document.querySelector('.backed').innerText.replace('Backed ', '').replace(' projects ', '');
  var locationDom = document.querySelector('.location a');
  if(locationDom) data.location = document.querySelector('.location a').innerText || '';
  data.joined_at = document.querySelector('.joined time').getAttribute('datetime');
  var superbackerDom = document.querySelector('.superbacker-badge');
  if(superbackerDom) data.fame = superbackerDom.innerText;
  var creatorDom = document.querySelector('.js-created-link span.count');
  if(creatorDom) data.create_num = creatorDom.innerText;
  data.comment_num = document.querySelector('.js-comments-link span.count').innerText;
  data.website = Array.from(document.querySelectorAll('#content-wrap li a')).map(d=>d.href);

  console.log(data);

  chrome.runtime.sendMessage({ 'msgtype': 'kickstater.user', 'content': data}, function (response) {
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
