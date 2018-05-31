
(function() {
  'use strict';
  // Your code here...
	crawl();


})();

function crawl(){

  var aweme_id = location.href.split('/')[5];
  //console.log(aweme_id);
  var url = 'https://kolranking.com/douyin/videos/' + aweme_id;
  notify('由于抖音改版，本页数据无法完整采集，请 <a href="' + url + '">登录网站</a> 查看最新数据', 20);
  var data = {};
  data.aweme_id = aweme_id;

  chrome.runtime.sendMessage({ 'msgtype': 'douyin.video.aweme_id', 'content': data}, function (response) {
    console.log(response);
  });

}

/******************************************************************************
 * 已废弃
 *****************************************************************************/
function fuck(){
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
  data.video_id = d.video.play_addr.uri;
  data.video_url = 'https://aweme.snssdk.com/aweme/v1/play/?video_id=' + data.video_id;
  data.static_cover = d.video.cover.url_list[0];

  data.raw = d;

  console.log(data);

  var card_desc = '播放量/' + data.play_count + ' 点赞数/' + data.digg_count;

  var jianhuo_url = 'http://jianhuo.toobigdata.com/douyin.php?title=' + encodeURIComponent('@' + data.author_name + ' | ' + data.desc) + '&des=' + encodeURIComponent(card_desc) + '&imgurl=' + data.static_cover + '&link=' + encodeURIComponent(location.href);

  var html = '<div class="desc">播放数: ' + data.play_count;
  html += '<br>点赞数: ' + data.digg_count;
  html += '<br>评论数: ' + data.comment_count;
  html += '<br>分享数: ' + data.share_count;
  html += '<br><a style="display: block; margin:15px 0; padding: 5px; background: #fff;" href="' + data.video_url + '">无水印视频地址</a><br> ';
  html += '<br><a href="' + jianhuo_url + '">生成分享卡</a><br> ';
  html += '<br><br>--由<a href="http://app.toobigdata.com/">爬爬</a>提供数据<br> ';
  html += '</div>';

  document.querySelector('.video-info').innerHTML += html;
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
