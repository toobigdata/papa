
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
  if(document.querySelector('.verify-info')) data.verify_info = document.querySelector('.verify-info').innerText;
  data.signature = document.querySelector('.signature').innerText;
  data.location = document.querySelector('.location').innerText;
  data.constellation = document.querySelector('.constellation').innerText;
  data.aweme_count = getRealNum(document.querySelector('.user-tab .num').innerText);
  data.like_count = getRealNum(document.querySelector('.like-tab .num').innerText);
	var short_id_raw = document.querySelector('.shortid').innerText;
	data.short_id = getRealNum(short_id_raw);
	var following_count = document.querySelector('.focus .num').innerText;
	data.following_count = getRealNum(following_count);
	var follower_count = document.querySelector('.follower .num').innerText;
	data.follower_count = getRealNum(follower_count);
	var total_favorited = document.querySelector('.liked-num .num').innerText;
	data.total_favorited = getRealNum(total_favorited);
	console.log(data);


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
          item.uid = uid;
          item.desc = d.aweme_list[i].desc;
          item.play_count = d.aweme_list[i].statistics.play_count;
          item.digg_count = d.aweme_list[i].statistics.digg_count;
          item.comment_count = d.aweme_list[i].statistics.comment_count;
          item.share_count = d.aweme_list[i].statistics.share_count;
          item.author_name = d.aweme_list[i].author.nickname;
          item.author_short_id = d.aweme_list[i].author.short_id;
          item.aweme_id = d.aweme_list[i].statistics.aweme_id;
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


function getRealNum(string){

	console.log('get real number');
	if(string.indexOf('抖音ID') >= 0) string = string.replace('抖音ID：', '');
	if(string.indexOf('关注') >= 0) string = string.replace('关注', '');
	if(string.indexOf('粉丝') >= 0) string = string.replace('粉丝', '');
	if(string.indexOf('赞') >= 0) string = string.replace('赞', '');
	string = string.replace(/\s/g, '');
	console.log(string);
	var list = ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','',''];
	var dict = {
			'':  1,
			'':  0,
			'':  3,
			'':  2,
			'':  4,
			'':  5,
			'':  6,
			'':  9,
			'':  7,
			'':  8,
			'':  4,
			'':  0,
			'':  1,
			'':  5,
			'':  2,
			'':  3,
			'':  6,
			'':  7,
			'':  8,
			'':  9,
			'':  0,
			'':  2,
			'':  1,
			'':  4,
			'':  3,
			'':  5,
			'':  7,
			'':  8,
			'':  9,
			'':  6,
	};
	console.log(string);
	var result = '';
	for(var i=0;i<string.length;i++){
		if(list.includes(string[i])) result += dict[string[i]];
		else result += string[i];
	}
	return result;
}
