(function() {
  'use strict';
  // Your code here...

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
  data.title = document.querySelector('.product-title h1 a').innerText;
  var reviewList = Array.from(document.querySelectorAll('#cm_cr-review_list .review'));
  //console.log(reviewList);

  data.review_list = reviewList.map(function(d){
    var item = d;
    var review = {};
    review.id = item.id;
    review.rating = item.querySelector('a i.review-rating').innerText.replace(' out of 5 stars', '');
    review.title = item.querySelector('a.review-title').innerText;
    review.author = item.querySelector('.author').innerText;
    review.author_profile_url = item.querySelector('.author').href;
    //review.author_fame = item.querySelector('a.c7y-badge-hall-of-fame').innerText;
    review.date = item.querySelector('.review-date').innerText;
    review.sku = item.querySelector('.review-data.review-format-strip').innerText;
    review.text = item.querySelector('.review-text').innerText;
    review.comment_num = item.querySelector('.review-comment-total').innerText;
    if(item.querySelector('.cr-vote .review-votes')) review.vote = item.querySelector('.cr-vote .review-votes').innerText;
    return review;
  });


  console.log(data);

  chrome.runtime.sendMessage({ 'msgtype': 'amazon.com.product.review', 'content': data}, function (response) {
    console.log(response);
  });

}

function crawlNextPage(){
	var btn = document.querySelector('li.a-last a');
	if(btn == null){
    return -1;
  } else {
    btn.click();
    setTimeout(function(){
      crawl();
      return 1;
    }, 1*1000);
  }
}
