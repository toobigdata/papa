
(function() {
  'use strict';
  // Your code here...
  console.log('douyin user'); 
	crawl();

  /*
  addBtn('autoreload', '当页爬', function(){
    minuteReload();
  });
  */

})();

function crawl(){

  var d = getVar('data');
  d = JSON.parse(d);
  console.log(d);

  var data = {};
  data.url = location.href.replace(/\?.*/g, '')
  data.title = document.title;
  data.uid = d.uid;
  data.nickname = d.nickname;
  data.follower_count = d.follower_count;
  data.total_favorited = d.total_favorited;
  data.aweme_count = d.aweme_count;
  data.signature = d.signature;
  data.short_id = d.short_id;
  data.raw = d;

  console.log(data);


  chrome.runtime.sendMessage({ 'msgtype': 'douyin.user', 'content': data}, function (response) {
    console.log(response);
  });

}


/******************************************************************************
 * 从当前页面内容中提取变量
 *****************************************************************************/
function getVar(index) {
  var content = document.body.innerHTML;
  var re = new RegExp('.*var ' + index + ' = (.*);');
  var a = content.match(re);
  if (!a) return null;
  var a = a[1];
  if (!a) return null;
  return a;
}
