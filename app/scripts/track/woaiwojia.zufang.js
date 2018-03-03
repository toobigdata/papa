(function() {
  'use strict';

	crawl();

})();

function crawl(){

  var data = {};
  data.url = location.href;
  data.title = document.querySelector('h1.house-tit').innerText;
  data.location = document.querySelector('body > div.main.container > div.details-view.clear > div.content.fr > div.zushous > ul > li:nth-child(6)').innerText;
  data.price = document.querySelector('body > div.main.container > div.details-view.clear > div.content.fr > div.housesty > div.jlyou.fl > div > p.jlinfo').innerText;
  data.detail = document.querySelector('.infocontent .fytese').innerText;
  data.rooms = document.querySelector('body > div.main.container > div.details-view.clear > div.content.fr > div.housesty > div:nth-child(2) > div > p.jlinfo.font18').innerText;
  data.area = document.querySelector('body > div.main.container > div.details-view.clear > div.content.fr > div.housesty > div:nth-child(3) > div > p.jlinfo').innerText;
  data.broker = {};
  data.broker.name = document.querySelector('.daikansty .daikcon h3').innerText;
  data.broker.phone = document.querySelector('.daikansty .daikcon label').innerText;

  console.log(data);

  chrome.runtime.sendMessage({ 'msgtype': 'woaiwojia.zufang', 'content': data}, function (response) {
    console.log(response);
  });

}
