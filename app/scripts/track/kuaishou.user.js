
(function() {
  'use strict';
  // Your code here...
  console.log('kuaishou user'); 
	crawl();

  /*
  addBtn('autoreload', '当页爬', function(){
    minuteReload();
  });
  */

})();

function crawl(){

  var data = {};
  data.url = location.href.replace(/\?.*/g, '')
  data.title = document.title;
  data.user_name = document.title.replace('的快手主页', '');
  if(document.querySelector('.description')){
    data.description = document.querySelector('.description').innerHTML;
  }
  data.head_url = document.querySelector('.avatar_ribbon img').src;
  data.banner_url = document.querySelector('.user_profile_hd img.banner').src;
  data.follower_count = document.querySelector('.fans_follows .fans').innerText.replace(' 粉丝', '');
  data.following_count = document.querySelector('.fans_follows .follows').innerText.replace(' 关注', '');
  data.photo_count = 0;
  if(document.querySelector('.user_photos_hd.count')){
    data.photo_count = document.querySelector('.user_photos_hd.count').innerText.replace(' 作品', '');
  }
  if(document.querySelectorAll('.photos li a')){
    data.raw = {};
    data.raw.photos = Array.from(document.querySelectorAll('.photos li a')).map(function(d){return d.href});
  }

  data.user_id = location.href.split('/')[4];
  console.log(data.user_id);
  var next_id = parseInt(data.user_id) + 1;
  var next_url = 'http://kuaishou.com/user/' + next_id;
    // 自动爬数
  
  console.log(data);


  chrome.runtime.sendMessage({ 'msgtype': 'kuaishou.user', 'content': data}, function (response) {
    console.log(response);
  });

  if(next_url){
    setTimeout(function(){
      location.href = next_url;
    }, 1*1000);
  }

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
