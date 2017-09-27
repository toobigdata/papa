'use strict';

/******************************************************************************
 * 解析文章
 *****************************************************************************/
$(function () {
  crawl();
});

function crawl(){

  var data = {};
  data.url = location.href;
  data.shop_name = document.querySelector('h1.shop-name').innerText.split(' ')[0];
  data.address = document.querySelector('.address').innerText.replace('地址： ', '');
  data.tel = document.querySelector('.tel').innerText.replace('电话： ', '');
  data.avg_price = document.querySelector('#avgPriceTitle').innerText.replace('人均：', '');
  data.taste_score = document.querySelector('#comment_score .item:nth-child(1)').innerText.replace('口味：', '');
  data.environment_score = document.querySelector('#comment_score .item:nth-child(2)').innerText.replace('环境：', '');
  data.service_score = document.querySelector('#comment_score .item:nth-child(3)').innerText.replace('服务：', '');

  console.log(data);

  chrome.runtime.sendMessage({ 'msgtype': 'dianping.shop', 'content': data}, function (response) {
    //console.log(response);
  });

}
