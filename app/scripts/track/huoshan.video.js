var datatype = 'huoshan.video';

(function() {
  'use strict';
  // Your code here...
  console.log('huoshan'); 
	crawl();

  addBtn('autoreload', '当页爬', function(){
    minuteReload();
  });

})();

function crawl(){

  var d = getVar();
  d = JSON.parse(d);
  console.log(d);

  var data = {};
  data.url = location.href.replace(/\?.*/g, '');
  data.title = document.title;
  data.id = d.id;
  data.create_time = d.create_time;
  data.author_name = d.author.nickname;
  data.author_uid = d.author.id;
  data.play_count = d.stats.play_count;
  data.digg_count = d.stats.digg_count;
  data.share_count = d.stats.share_count;
  data.ticket = d.stats.ticket;
  data.income = d.stats.income;
  data.video_url = d.video.real_play_addr;
  data.raw = d;

  //评论数在网页版上没有

  console.log(data);

  chrome.runtime.sendMessage({ 'msgtype': datatype, 'content': data}, function (response) {
    console.log(response);
  });

}


/******************************************************************************
 * 从当前页面内容中提取变量
 *****************************************************************************/
function getVar() {
  var content = document.body.innerHTML;
  var re = new RegExp('.*data\:(.*)\\}\\);');

  var a = content.match(re);
  console.log(a);

  if (!a) return null;
  var a = a[1];
  return a;
}
