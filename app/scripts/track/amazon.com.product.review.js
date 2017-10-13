// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://*/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  // Your code here...
  setTimeout(function(){
    crawl();
  }, 3*1000);

  var sidebar = document.createElement('div');
  sidebar.id = 'jz_crawl_btn';
  sidebar.style = 'z-index: 999; position: fixed; top: 40px; right: 0; background: green; padding: 10px;';
  sidebar.innerHTML = '<a style="color: #fff" class="btn" href="#" id="jz_crawl" title="">Auto Crawl</a>';
  document.body.appendChild(sidebar);
  $('#jz_crawl').click(function(){
		setInterval(function(){
			crawlNextPage();
		}, 5*1000);
    //alert('成功加入监测，监测期间请勿关闭页面。微信分钟级监测最多持续 2 小时。');
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
    //review.author_fame = item.querySelector('a.c7y-badge-hall-of-fame').innerText;
    review.date = item.querySelector('.review-date').innerText;
    review.sku = item.querySelector('.review-data.review-format-strip').innerText;
    review.text = item.querySelector('.review-text').innerText;
    review.comment_num = item.querySelector('.review-comment-total').innerText;
    if(item.querySelector('.cr-vote .review-votes')) review.vote = item.querySelector('.cr-vote .review-votes').innerText;
    console.log(review);
    return review;
  });


  console.log(data);

  chrome.runtime.sendMessage({ 'msgtype': 'amazon.com.product.review', 'content': data}, function (response) {
    console.log(response);
  });

}

function crawlNextPage(){
	var btn = document.querySelector('li.a-last a');
	if(btn){
    btn.click();
    setTimeout(function(){
      crawl();
    }, 3*1000);
  }
}
