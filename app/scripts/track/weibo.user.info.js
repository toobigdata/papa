(function() {
  'use strict';
  
  setTimeout(function(){
    crawl();
  }, 3*1000);

})();

function crawl(){

  var data = {};
  data.url = location.href;
  var counter = document.querySelectorAll('table.tb_counter .S_line1 strong');
  data.follow_num = counter[0].innerText;
  data.fan_num = counter[1].innerText;
  data.status_num = counter[2].innerText;
  data.screen_name = document.querySelector('h1.username').innerText;
  var info = document.querySelectorAll('li.li_1');
  data.info =Array.from(info).map(a=>a.innerText.replace('\n', ' '));

  console.log(data);

  chrome.runtime.sendMessage({ 'msgtype': 'weibo.user.info', 'content': data}, function (response) {
    console.log(response);
  });

}

