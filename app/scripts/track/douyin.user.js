
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

var dict = {
  '&#xe602;':  1,
  '&#xe603;':  0,
  '&#xe604;':  3,
  '&#xe605;':  2,
  '&#xe606;':  4,
  '&#xe607;':  5,
  '&#xe608;':  6,
  '&#xe609;':  9,
  '&#xe60a;':  7,
  '&#xe60b;':  8,
  '&#xe60c;':  4,
  '&#xe60d;':  0,
  '&#xe60e;':  1,
  '&#xe60f;':  5,
  '&#xe610;':  2,
  '&#xe611;':  3,
  '&#xe612;':  6,
  '&#xe613;':  7,
  '&#xe614;':  8,
  '&#xe615;':  9,
  '&#xe616;':  0,
  '&#xe617;':  2,
  '&#xe618;':  1,
  '&#xe619;':  4,
  '&#xe61a;':  3,
  '&#xe61b;':  5,
  '&#xe61c;':  7,
  '&#xe61d;':  8,
  '&#xe61e;':  9,
  '&#xe61f;':  6
}

function crawl(){

  var nums = document.querySelectorAll('.follow-num');
  for(var i=0;i<nums.length;i++){
    //console.log(dict[nums[i].innerText]);
  }
  var html = document.body;

  /*
  if(!d){
    var next_id = parseInt(location.href.split('/')[5]) + 1;
    var next_url = 'https://www.douyin.com/share/user/' + next_id;
    if(next_url){
      location.href = next_url;
    }
  }
  */

  var uid = parseInt(location.href.split('/')[5]);
  var url = 'https://kolranking.com/douyin/users/' + uid;
  notify('由于抖音改版，本页数据无法完整采集，请 <a href="' + url + '">登录网站</a> 查看最新数据', 20);
  //console.log(url);

  var data = {};
  data.url = location.href.replace(/\?.*/g, '')
  data.title = document.title;
  data.uid = uid;
  data.avatar = document.querySelector('.personal-card .author img.avatar').src;
  data.nickname = document.querySelector('.nickname').innerText;
  data.signature = document.querySelector('.signature').innerText;
  data.location = document.querySelector('.location').innerText;
  data.constellation = document.querySelector('.constellation').innerText;
  data.personal_card_html = document.querySelector('.personal-card').innerHTML;
  data.video_tab_html = document.querySelector('.video-tab').innerHTML;
  //console.log(data);

  chrome.runtime.sendMessage({ 'msgtype': 'douyin.user', 'content': data}, function (response) {
    console.log(response);
  });

  getDouyinUserLikeVideos(uid);

  /* 下一个
  console.log(data.uid);
  var next_id = parseInt(data.uid) + 1;
  var next_url = 'https://www.douyin.com/share/user/' + next_id;
  if(next_url){
    setTimeout(function(){
      location.href = next_url;
    }, 1*1000);
  }
  */

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

function getDouyinUserLikeVideos(uid){
  var url = 'https://www.douyin.com/aweme/v1/aweme/favorite/?user_id=' + uid + '&count=100&max_cursor=0&aid=1128'
  var source = 'douyin.user.like';
  //console.log(source);
  //console.log(url);

	$.ajax({
			url: url,
      data: {},
			success: function(d) { 
        var result = {};
        result.aweme_list = [];
        //console.log(d);

        for(var i=0;i<d.aweme_list.length;i++){
          var item = {};
          item.desc = d.aweme_list[i].desc;
          item.play_count = d.aweme_list[i].statistics.play_count;
          item.digg_count = d.aweme_list[i].statistics.digg_count;
          item.comment_count = d.aweme_list[i].statistics.comment_count;
          item.share_count = d.aweme_list[i].statistics.share_count;
          item.author_name = d.aweme_list[i].author.nickname;
          item.url = 'https://www.douyin.com/share/video/' + d.aweme_list[i].statistics.aweme_id;
          item.real_url = 'https://aweme.snssdk.com/aweme/v1/play/?video_id=' + d.aweme_list[i].video.play_addr.uri;
          result.aweme_list.push(item);
        }
        result.raw = d;

        chrome.runtime.sendMessage({ 'msgtype': 'douyin.user.like', 'content': result}, function (response) {
          console.log(response);
        });

      }
	});
}
