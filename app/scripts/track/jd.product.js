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


})();

function crawl(){

  var data = {};
  data.url = location.href;
  data.title = document.querySelector('.sku-name').innerText.replace(/\s/g, '');
  data.price = document.querySelector('.price').innerText;
  data.commentCount = document.querySelector('.comment-count .count')?document.querySelector('.comment-count .count').innerText:'';
  data.image = document.querySelector('#preview img').src;
  data.des = document.querySelector('.news').innerText.replace(/\s/g, '');
  console.log(data);

  var jianhuo_url = 'http://jianhuo.toobigdata.com/?title=' + encodeURIComponent(data.title) + '&des=' + encodeURIComponent(data.des) + '&price=' + data.price + '&imgurl=' + data.image + '&link=' + encodeURIComponent(data.url);
  console.log(jianhuo_url);


  addBtn('jianhuo', '荐货', function(){
    location.href = jianhuo_url;
  });



  chrome.runtime.sendMessage({ 'msgtype': 'jd.product', 'content': data}, function (response) {
    console.log(response);
  });

}

function crawlNextPage(){
	var btn = document.querySelector('a.ui-pager-next');
	if(btn != null){
    btn.click();
    setTimeout(function(){
      //crawl();
      return 1;
    }, 1*1000);
  } else {
    return -1;
  }
}
