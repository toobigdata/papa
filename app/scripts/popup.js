'use strict';

$(function(){
  var manifest = chrome.runtime.getManifest();
  document.getElementById('version').innerText = manifest.version; 
  render(); 
  $('a#show-options').click(function(){
    $('.option-area').show();
  });
});

// 关闭所有微信文章标签页
document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#closeAllWxTabs').addEventListener('click', closeAllWxTabs);
  //document.querySelector('#minuteReload').addEventListener('click', minuteReload);
});




var sync = localStorage.sync;
if (sync === 'true') {
  $('#more').show();
}

function render() {

  chrome.tabs.query({
    // 获取当前窗口当前标签页
    currentWindow: true,
    active: true
  }, function (tabArray) {
    console.log(tabArray);
    var taburl = tabArray[0].url;
    if(taburl.indexOf('mp.weixin.qq.com/s?') < 0){
      return;
    }

    var biz = getQuery(taburl, '__biz');
    var mid = getQuery(taburl, 'mid');
    var idx = getQuery(taburl, 'idx');
    var uid = biz + '.' + mid + '.' + idx;

    var uin = getQuery(taburl, 'uin');
    var key = getQuery(taburl, 'key');
    var pass_ticket = getQuery(taburl, 'pass_ticket');
    var devicetype = getQuery(taburl, 'devicetype');
    var version = getQuery(taburl, 'version');
    var ascene = getQuery(taburl, 'ascene');

    if(biz&&uin&&key&&pass_ticket){
      var accountUrl = 'account.html?__biz=' + biz + '&uin=' + uin + '&key=' + key + '&pass_ticket=' + pass_ticket + '&devicetype=' + devicetype + '&version=' + version + '&ascene=' + ascene;
      document.getElementById('history').href = accountUrl;
    }
  });
}

function closeAllWxTabs(){
  chrome.runtime.sendMessage({ 'msgtype': 'command', 'command': 'closeAllWxTabs' }, function (response) {
    console.log(response);
  });
}

