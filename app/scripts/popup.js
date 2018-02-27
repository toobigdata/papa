'use strict';

$(function(){
  loadConfig();
	render();
  var manifest = chrome.runtime.getManifest();
  document.getElementById('version').innerText = manifest.version; 
	if(localStorage.papa_switch == 'true'){
		console.log('true');
		document.querySelector('#papa_switch').checked = true;
		document.querySelector('#papa_switch_status').innerText = '已开启';
	}

	if(localStorage.papa_local == 'true'){
		console.log('true');
		document.querySelector('#papa_local').checked = true;
		document.querySelector('#papa_local_status').innerText = '已开启';
	}

  //render(); 
  $('a#show-options').click(function(){
    $('.option-area').toggle();
  });
});

document.addEventListener('DOMContentLoaded', function () {
  //document.querySelector('#closeAllWxTabs').addEventListener('click', closeAllWxTabs);

	$('#papa_switch').change(function () {
		console.log(document.querySelector('#papa_switch').checked);
		if(document.querySelector('#papa_switch').checked == true){
			localStorage.papa_switch = 'true';
			document.querySelector('#papa_switch_status').innerText = '已开启';
		} else {
			localStorage.papa_switch = 'false';
			document.querySelector('#papa_switch_status').innerText = '已关闭';
		}
	});

	$('#papa_local').change(function () {
		console.log(document.querySelector('#papa_local').checked);
		if(document.querySelector('#papa_local').checked == true){
			localStorage.papa_local = 'true';
			document.querySelector('#papa_local_status').innerText = '已开启';
		} else {
			localStorage.papa_local = 'false';
			document.querySelector('#papa_local_status').innerText = '已关闭';
		}
	});
});


var sync = localStorage.sync;
if (sync === 'true') {
  $('#more').show();
}

function closeAllWxTabs(){
  chrome.runtime.sendMessage({ 'msgtype': 'command', 'command': 'closeAllWxTabs' }, function (response) {
    console.log(response);
  });
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
    var appmsg_token = localStorage.appmsg_token;

    if(biz&&uin&&key&&pass_ticket){
      var accountUrl = 'account.html?__biz=' + biz + '&uin=' + uin + '&key=' + key + '&pass_ticket=' + pass_ticket + '&devicetype=' + devicetype + '&version=' + version + '&ascene=' + ascene + '&appmsg_token=' + appmsg_token;
      document.getElementById('history').href = accountUrl;
    }
  });
}

