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
  data.keyword = document.querySelector('.search-key').innerText;
  data.href = location.href;
  data.product_list = Array.from(document.querySelectorAll('.gl-item')).map(function(d,index){
    if(d.getAttribute('data-sku')){
      return {
          'keyword': document.querySelector('.search-key').innerText,
          'page': document.querySelector('#J_topPage .fp-text b').innerText,
          'rank': index + 1,
          'price': d.querySelector('.p-price strong').innerText,
          'name': d.querySelector('.p-name a').innerText,
          'commentCount': d.querySelector('.p-commit a').innerText,
          'shop': d.querySelector('.p-shop').innerText,
          'image': d.querySelector('.p-img img').src,
      };
    }
  });
  console.log(data);

  chrome.runtime.sendMessage({ 'msgtype': 'jd.product.search', 'content': data}, function (response) {
    console.log(response);
  });

}

function crawlNextPage(){
	var btn = document.querySelector('a.pn-next');
	if(btn != null){
    btn.click();
    setTimeout(function(){
      crawl();
      return 1;
    }, 1*1000);
  } else {
    return -1;
  }
}
