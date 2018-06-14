(function() {
  'use strict';
  
  console.log('weibo.search.weibo');
  setTimeout(function(){
    crawl();
  }, 5*1000);


  addBtn('jz_crawl', '下一页', function(){
    crawlNextPage();
  });

  addBtn('autoreload', '当页爬', function(){
    minuteReload();
  });

  addBtn('help', '文档', function(){
    location.href = 'http://toobigdata.com/papa-help-weibo-user/';
  });

})();

function crawl(){

  var data = {};
  data.url = location.href;

  var feedList = document.querySelectorAll('.feed_lists .WB_cardwrap');
  data.feed_list = Array.from(feedList).map(function(d){
    var r = {};
    r.weibo_mid = d.querySelector('div[action-type="feed_list_item"]').getAttribute('mid');
    r.search_keyword = document.querySelector('.searchInp_form').getAttribute('value');
    r.nickname = d.querySelector('.feed_content .W_texta.W_fb').innerText.replace(/\s/g, '');
    r.avatar = d.querySelector('.face .W_face_radius').src;
    if(d.querySelector('.feed_content a.icon_approve')){
      r.user_verify = 1;
    } else if(d.querySelector('.feed_content a.icon_approve_co')){
      r.user_verify = 2;
    } else {
      r.user_verify = 0;
    }
    r.user_link = d.querySelector('.feed_content .W_texta.W_fb').href;
    r.uid = d.querySelector('.feed_content .W_texta.W_fb').getAttribute('usercard').match(/id=(\d*)&.*/)[1];
    r.content_text = d.querySelector('.feed_content .comment_txt').innerText;
    r.weibo_link = d.querySelector('.feed_from a[node-type="feed_list_item_date"]').href;
    r.weibo_created = d.querySelector('.feed_from a[node-type="feed_list_item_date"]').title;
    if(d.querySelector('.feed_from a:nth-child(2)')) r.from_app = d.querySelector('.feed_from a:nth-child(2)').innerText;


    r.forward_count = d.querySelector('div[action-type="feed_list_item"] > .feed_action ul.feed_action_info li a[action-type="feed_list_forward"] span').innerText.replace('转发', '') || 0;
    r.comment_count = d.querySelector('div[action-type="feed_list_item"] > .feed_action ul.feed_action_info li a[action-type="feed_list_comment"] span').innerText.replace('评论', '') || 0;
    r.like_count = d.querySelector('div[action-type="feed_list_item"] > .feed_action ul.feed_action_info li a[action-type="feed_list_like"] span').innerText || 0;
    if(d.querySelector('.feed_content .media_box img')) r.content_pic = Array.from(d.querySelectorAll('.feed_content .media_box img')).map(function(d){
      return d.src;
    });
    return r;
  });

  console.log(data);

  chrome.runtime.sendMessage({ 'msgtype': 'weibo.search.weibo', 'content': data}, function (response) {
    console.log(response);
  });

  /*
  setTimeout(function(){
    crawlNextPage();
  }, 1*1000);
  */

}

function crawlNextPage(){
	var btn = document.querySelector('a.page.next');
	if(btn == null){
    return -1;
  } else {
    btn.click();
  }
}
