
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
  if(document.querySelector('.user_photos_hd.count')){
    data.photo_count = document.querySelector('.user_photos_hd.count').innerText.replace(' 作品', '');
  }
  if(document.querySelectorAll('.photos li a')){
    data.raw = {};
    data.raw.photos = Array.from(document.querySelectorAll('.photos li a')).map(function(d){return d.href});
  }
  if(document.querySelector('.btn.btn_follow._download')){
    data.user_id =  document.querySelector('.btn.btn_follow._download').dataset.schemeUrl.replace('kwai://profile/', '');
  }
  
  console.log(data);


  chrome.runtime.sendMessage({ 'msgtype': 'kuaishou.user', 'content': data}, function (response) {
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
