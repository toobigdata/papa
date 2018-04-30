
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
  console.log(html);

  /*
  if(!d){

    var next_id = parseInt(location.href.split('/')[5]) + 1;
    var next_url = 'https://www.douyin.com/share/user/' + next_id;
    if(next_url){
      location.href = next_url;
    }

  }
  */

  var data = {};
  data.url = location.href.replace(/\?.*/g, '')
  data.title = document.title;
  data.avatar = document.querySelector('.personal-card .author img.avatar').src;
  data.nickname = document.querySelector('.nickname').innerText;
  data.signature = document.querySelector('.signature').innerText;
  data.location = document.querySelector('.location').innerText;
  data.constellation = document.querySelector('.constellation').innerText;
  data.personal_card_html = document.querySelector('.personal-card').innerHTML;
  data.video_tab_html = document.querySelector('.video-tab').innerHTML;
  console.log(data);

  chrome.runtime.sendMessage({ 'msgtype': 'douyin.user', 'content': data}, function (response) {
    console.log(response);
  });


  /*
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
