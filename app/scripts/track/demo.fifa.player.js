var source = 'demo.fifa.player';

(function() {
  'use strict';
  // Your code here...
  addBtn('crawl', '爬取球员信息', function(){
    crawl();
  });
})();

function crawl(){
  var data = {};
  data.url = location.href;
  data.list = Array.from(document.querySelectorAll('.fi-p--link')).map(function(d){
    var item = {};
    item.avatar = d.querySelector('.fi-p__picture svg image').getAttribute('xlink:href');
    item.number = d.querySelector('.fi-p__picture .fi-p__num').innerText;
    item.country_code = d.querySelector('.fi-p__flag').getAttribute('data-countrycode');
    item.country_image = d.querySelector('.fi-p__flag img').src;
    item.url = d.href;
    item.name = d.querySelector('.fi-p__wrapper-text .fi-p__name').innerText;
    item.country = d.querySelector('.fi-p__wrapper-text .fi-p__country').innerText;
    item.role = d.querySelector('.fi-p__wrapper-text .fi-p__role').innerText;
    return item;
  });

  console.log(data);
  chrome.runtime.sendMessage({ 'msgtype': source, 'content': data}, function (response) {
    console.log(response);
  });
}


