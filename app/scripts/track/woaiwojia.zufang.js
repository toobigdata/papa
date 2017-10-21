(function() {
  'use strict';

	crawl();

})();

function crawl(){

  var data = {};
  data.url = location.href;
  data.title = document.querySelector('h1.house-tit').innerText;
  data.location = document.querySelector('.w-full.path .main').innerText.replace(/\s+>\s+当前房源/, '').replace(/租房/g, '');
  data.price = document.querySelector('.house-info .font-price').innerText;
  data.detail = document.querySelector('.house-info-2').innerText;
  data.broker = {};
  data.broker.name = document.querySelector('.house-broker .house-broker-info .mr-t').innerText;
  data.broker.phone = document.querySelector('.house-broker .house-broker-info .house-broker-tel').innerText;

  console.log(data);

  chrome.runtime.sendMessage({ 'msgtype': 'woaiwojia.zufang', 'content': data}, function (response) {
    console.log(response);
  });

}
