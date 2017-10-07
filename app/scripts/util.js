var _AnalyticsCode = 'UA-79388719-4';
var _gaq = _gaq || [];
_gaq.push(['_setAccount', _AnalyticsCode]);
_gaq.push(['_trackPageview']);
(function() {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
})();
function trackButtonClick(e) {
  _gaq.push(['_trackEvent', e.target.id, 'clicked']);
}
document.addEventListener('DOMContentLoaded', function () {
  var buttons = document.querySelectorAll('a');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', trackButtonClick);
  }
});

function getQuery(url, name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  //console.log(name);
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
      results = regex.exec(url);

  //console.log(results);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function createXmlHttpRequest() {
  if (window.ActiveXObject) {
    //如果是IE浏览器 
    return new ActiveXObject('Microsoft.XMLHTTP');
  } else if (window.XMLHttpRequest) {
    //非IE浏览器 
    return new XMLHttpRequest();
  }
}

function correct(url) {
  if(url.indexOf('__biz') > 0 && url.indexOf('mid') > 0 && url.indexOf('idx') > 0) return true;
  if(url.indexOf('__biz') > 0 && url.indexOf('appmsgid') > 0 && url.indexOf('itemidx') > 0) return true;
  return false;
}


function getComments(url){
  var source = 'comments';
  if(url.indexOf('jd.com') > 0) source = 'jd.product.comments';

  if(url.indexOf('tmall.com') > 0) source = 'tmall.product.comments';

	$.ajax({
			url: url,
      data: {},
			success: function(d) { 
        json = d.substr(d.indexOf('{'), d.lastIndexOf('}') - d.indexOf('{') + 1);
        json = JSON.parse(json); 
        sendtoServer(json, source);
        console.log('get comments' + url);
      }
	});
}

function sendtoServer(data, source) {

  var manifest = chrome.runtime.getManifest();
  var crxVersion = manifest.version;
  var ts = new Date();
  var today = ts.getFullYear() + '-' + ('0' + (ts.getMonth() + 1)).slice(-2) + '-' + ('0' + ts.getDate()).slice(-2);

  var url = 'http://pcsdpku.com/jz/index.php';

	$.ajax({
			type: 'POST',
			url: url,
			data: JSON.stringify({
				'uid': phone,
				'source': source,
				'data': JSON.stringify(data),
				'timestamp': ts.getTime(),
				'event_date': today,
				'version': crxVersion
			}),
			success: function(d) { console.log(d); },
			contentType: 'application/json',
			dataType: 'json'
	});
}


// 每 60s 自动关闭已加载完成的微信页面
function daemon() {
  updateSettings();
  if(isWechatAutoClose === 'true') closeTabs();
  clearStorage();
  setTimeout(function () {
    daemon();
  }, 60 * 1000);
}

function updateSettings(){
  phone = localStorage.phone || '';
  isWechatAutoClose = localStorage.options_wechatAutoClose || 'false';
  wechatHistoryMax = localStorage.options_wechatHistoryMax || 10;
}

function closeTabs(){
  chrome.tabs.query({ 'status': 'complete', 'url': '*://mp.weixin.qq.com/*pass_ticket*' }, function (tabs) {
    //console.log(tabs);
    var tabIds = $.map(tabs, function (value, index) {
      return tabs[index].id;
    });
    chrome.tabs.remove(tabIds);
  });
}

function clearStorage() {
  chrome.storage.local.clear(function () {
    //do something
    console.log('local storage clear');
  });
}

function getSource(url) {
  console.log(url);
  for(var i in config){
    for(var j=0;j<config[i]['url_re'].length;j++){
      var re = new RegExp(config[i]['url_re'][j], 'i');
      //console.log(re);
      if(url.match(re)) return i;
    }
  }
  return 0;
}
