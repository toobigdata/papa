// 微博关注/粉丝数据

(function() {
  'use strict';
  
  setTimeout(function(){
    crawl();
  }, 3*1000);


  addBtn('jz_crawl', '翻页爬', function(){
		var intervalId = setInterval(function(){
			if(crawlNextPage() < 0){
        clearInterval(intervalId);
        notify('数据抓取完毕');
      }
		}, 5*1000);
  });

  addBtn('autoreload', '当页爬', function(){
    minuteReload();
  });

})();

function crawl(){

  var data = {};
  data.url = location.href;
  var followList = document.querySelectorAll('.follow_list li.follow_item');
  data.follow_list = Array.from(followList).map(function(d){
    var r = {};
    r.data = d.getAttribute('action-data');
    if(r.data){
      var sp = r.data.split('&');
      r.uid = sp[0].replace('uid=', '');
      r.nickname = sp[0].replace('fnick=', '');
      r.gender = sp[2].replace('sex=', '');
    }
    r.link = d.querySelector('.mod_pic a').href;
    r.avatar = d.querySelector('.mod_pic a img').src;
    var number = d.querySelectorAll('.info_connect span.conn_type .count');
    r.follow_num =  number[0].innerText;
    r.fan_num =  number[1].innerText;
    r.status_num =  number[2].innerText;
    r.address = d.querySelector('.info_add span').innerText;
    r.intro = d.querySelector('.info_intro span')?d.querySelector('.info_intro span').innerText:'';
    r.source = d.querySelector('.info_from').innerText;
    return r;
  });
  //console.log(data);

  chrome.runtime.sendMessage({ 'msgtype': 'weibo.user.follow', 'content': data}, function (response) {
    console.log(response);
  });
}

function crawlNextPage(){

  var btn = document.querySelector('a.page.next');
	if(btn == null || btn.className.indexOf('page_dis') > 0){
    return -1;
  } else {
    btn.click();
    var limit = document.querySelector('.layer_point .point p');
    if(limit) return -1;
    setTimeout(function(){
      crawl();
      return 1;
    }, 1*1000);
  }
}
