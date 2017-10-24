(function() {
  'use strict';
  setTimeout(function(){
    //crawl();
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

/*
function crawl(){

  var data = {};
  data.url = location.href;
  data.title = document.querySelector('.sku-name').innerText;
  data.price = document.querySelector('.price').innerText;
  data.commentCount = document.querySelector('.comment-count .count')?document.querySelector('.comment-count .count').innerText:'';
  console.log(data);

  chrome.runtime.sendMessage({ 'msgtype': 'jd.product', 'content': data}, function (response) {
    console.log(response);
  });

}
*/

function crawlNextPage(){
	var btn = document.querySelector('.rate-paginator a:nth-last-child(1)');
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
