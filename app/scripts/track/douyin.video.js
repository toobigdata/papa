
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
  data.static_cover = d.video.cover.url_list[0];
  data.raw = d;

  console.log(data);

  var card_desc = '播放量/' + data.play_count + ' 点赞数/' + data.digg_count;

  var jianhuo_url = 'http://jianhuo.toobigdata.com/douyin.php?title=' + encodeURIComponent('你的好友 @' + data.author_name + ' 需要你的爱心 | ' + data.desc) + '&des=' + encodeURIComponent(card_desc) + '&imgurl=' + data.static_cover + '&link=' + encodeURIComponent(data.url);

  var html = '<div class="desc">播放数: ' + data.play_count;
  html += '<br>点赞数: ' + data.digg_count;
  html += '<br>评论数: ' + data.comment_count;
  html += '<br>分享数: ' + data.share_count;
  html += '<br><a href="' + data.video_url + '">视频地址</a><br> ';
  html += '<br><a href="' + jianhuo_url + '">生成分享卡</a><br> ';
  html += '<br><br>--由<a href="http://app.toobigdata.com/">爬爬</a>提供数据<br> ';
  html += '</div>';

  document.querySelector('.video-info').innerHTML += html;


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
