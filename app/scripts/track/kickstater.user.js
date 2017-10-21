(function() {
  'use strict';
  
  setTimeout(function(){
    crawl();
  }, 3*1000);

  addBtn('jz_crawl', '翻页爬', function(){
		var intervalId = setInterval(function(){
			if(crawlNextPage() < 0){
        clearInterval(intervalId);
        notify('数据抓取完毕');
      }
		}, 5*1000);
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
	if(btn == null){
    return -1;
  } else {
    btn.click();
    setTimeout(function(){
      crawl();
      return 1;
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
