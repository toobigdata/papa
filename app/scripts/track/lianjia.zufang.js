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
	crawl();

})();

function crawl(){

  var data = {};
  data.url = location.href;
  data.title = document.querySelector('.title h1.main').innerText;
  data.sub_title = document.querySelector('.title .sub').innerText;
  data.location = document.querySelector('.intro .fl.l-txt').innerText.replace(' >  当前房源 ', '').replace(/租房/g, '');
  data.house_id = document.querySelector('.houseNum').innerText;
  data.price = document.querySelector('.price .total').innerText;
  data.price_unit = document.querySelector('.price .unit').innerText;
  data.decoration = document.querySelector('.tips.decoration').innerText;
  data.detail = document.querySelector('.zf-room').innerText;
  data.broker = {};
  data.broker.name = document.querySelector('.brokerInfo .brokerName a').innerText;
  data.broker.tag = document.querySelector('.brokerInfo .brokerName .tag').innerText;
  data.broker.rate = document.querySelector('.brokerInfo .evaluate .rate').innerText;
  data.broker.this_item_times = document.querySelector('.brokerInfo .evaluate .time').innerText;
  data.broker.phone = document.querySelector('.brokerInfo .phone').innerText;

  data.xiaoqu_id = document.querySelector('.zf-room p a').href.split('/')[4];

  var stat_url =  data.url.replace('.html', '&rid=' + data.xiaoqu_id).replace('zufang/', 'zufang/housestat?hid=');

  var hr = createXmlHttpRequest();
  hr.open('GET', stat_url, false);
  hr.setRequestHeader('Content-Type', 'application/json');
  hr.send();

  data.stat = JSON.parse(hr.response).data;

  //console.log(data);

  chrome.runtime.sendMessage({ 'msgtype': 'lianjia.zufang', 'content': data}, function (response) {
    //console.log(response);
  });

}


function getVar(index) {
  var content = document.body.innerHTML;
  var re = new RegExp('var ' + index + ' = [\"\'](.+)[\"\']');
  var a = content.match(re);
  if (!a) return null;
  var a = a[0];
  if (!a) return null;
  if (index == 'msg_source_url') {
    var s = a.indexOf('\'');
    var e = a.lastIndexOf('\'');
  } else {
    var s = a.indexOf('"');
    var e = a.lastIndexOf('"');
  } 

  return a.substring(s + 1, e);
}

