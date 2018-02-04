
(function() {
  'use strict';
  // Your code here...
  console.log('douyin'); 
	crawl();

  addBtn('autoreload', '当页爬', function(){
    minuteReload();
  });

})();

function crawl(){

  var d = getVar('data');
  d = JSON.parse(d);
  console.log(d);

  var data = {};
  data.url = location.href.replace(/\?.*/g, '')
  data.title = document.title;
  data.desc = d.desc;
  data.aweme_id = d.aweme_id;
  data.create_time = d.create_time;
  data.author_name = d.author.nickname;
  data.author_uid = d.author.uid;
  data.play_count = d.statistics.play_count;
  data.comment_count = d.statistics.comment_count;
  data.digg_count = d.statistics.digg_count;
  data.share_count = d.statistics.share_count;
  data.video_url = d.video.real_play_addr;
  data.raw = d;

  console.log(data);

  chrome.runtime.sendMessage({ 'msgtype': 'douyin.video', 'content': data}, function (response) {
    console.log(response);
  });

}


/******************************************************************************
 * 从当前页面内容中提取变量
 *****************************************************************************/
function getVar(index) {
  var content = document.body.innerHTML;
  var re = new RegExp('.*var ' + index + ' = \\[(.*)\\]');
  var a = content.match(re);
  if (!a) return null;
  var a = a[1];
  if (!a) return null;
  return a;
}
