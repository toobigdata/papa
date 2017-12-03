'use strict';

$(function(){
  loadConfig();
  /*
  var manifest = chrome.runtime.getManifest();
  document.getElementById('version').innerText = manifest.version; 
  */
	if(localStorage.papa_switch == 'true'){
		console.log('true');
		document.querySelector('#papa_switch').checked = true;
		document.querySelector('#papa_switch_status').innerText = '已开启';
	}


  //render(); 
  $('a#show-options').click(function(){
    $('.option-area').toggle();
  });
});

// 关闭所有微信文章标签页
document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#closeAllWxTabs').addEventListener('click', closeAllWxTabs);

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

