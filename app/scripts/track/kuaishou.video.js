
(function() {
  'use strict';
  // Your code here...
  console.log('kuaishou.video'); 
	crawl();

  addBtn('autoreload', '当页爬', function(){
    minuteReload();
  });

})();

function crawl(){

  var d = getVar('window.__data__');
  d = JSON.parse(d);

  var data = {};
  data.url = location.href.replace(/\?.*/g, '')
  data.title = document.title;
  data.userName = d.photo.userName;
  data.photoId = d.photo.photoId;
  data.caption = d.photo.caption;
  data.viewCount = d.photo.viewCount;
  data.likeCount = d.photo.likeCount;
  data.commentCount = d.photo.commentCount;

  data.raw = d;

  console.log(data);


  chrome.runtime.sendMessage({ 'msgtype': 'kuaishou.video', 'content': data}, function (response) {
    console.log(response);
  });

}


/******************************************************************************
 * 从当前页面内容中提取变量
 *****************************************************************************/
function getVar(index) {
  var content = document.body.innerHTML;
  var re = new RegExp('.*' + index + ' = (.*);</script><.*');
  var a = content.match(re);
  if (!a) return null;
  var a = a[1];
  if (!a) return null;
  return a;
}
