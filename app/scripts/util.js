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
  var source = 'comment';
  if(url.indexOf('jd.com') > 0) source = 'jd.product.comment';

  if(url.indexOf('tmall.com') > 0) source = 'tmall.product.comment';

	$.ajax({
			url: url,
      data: {},
			success: function(d) { 
        json = d.substr(d.indexOf('{'), d.lastIndexOf('}') - d.indexOf('{') + 1);
        json = JSON.parse(json); 
        json.url = url;
        sendtoServer(json, source);
        console.log('get comments' + url);

        var listData = json;

        var selector = config[source].list.split('.');
        for(var j=0;j<selector.length;j++){
          listData = listData[selector[j]];
        }

        for(var i=0;i<listData.length;i++){
          listData[i].ts = new Date();
          appendStorage(source, listData[i]);
        }
      }
	});
}


function getWxData(r, type){
	var meta = {
		biz: getQuery(r.url, '__biz'),
		mid: getQuery(r.url, 'mid'),
		idx: getQuery(r.url, 'idx'),
		url: r.url
	}; 
  if(r && type == 'comment'){
    $.ajax({
        type: "GET",
        url: r.url + "do_not",
        //data: r.requestBody.formData,
        //contentType: false,
        success: function(d) { 
          //console.log(d);
            var json = {};
            json.comment_data = d;
            json.meta_data = meta;
            sendtoServer(json, 'wechat.article.comment');
        }
    });
	} else if(r && type == 'ext'){
    if(r.url.indexOf('getappmsgext')>0){
      $.ajax({
          type: "POST",
          url: r.url + "do_not",
          data: {
            is_only_read: 1
          },
          contentType: false,
          success: function(d) { 
            console.log(d);
            var json = {};
            json.ext_data = d;
            json.meta_data = meta;
            sendtoServer(json, 'wechat.article.ext');
          }
      });
    }
  } else {
		console.log('not comment');
	}
}

function getAmazonSellerMessageData(r){
    $.ajax({
        type: "POST",
        url: r.url + "#do_not",
        data: r.requestBody,
        //contentType: false,
        success: function(d) { 
            console.log(d);
            var parser = new DOMParser();
            d = parser.parseFromString(d, "text/xml");

            var data = {};
            data.url = location.href;

            var scriptList = Array.from(d.querySelectorAll('script'));
            console.log(scriptList);

            data.message_list = scriptList.map(function(d){
              
              var message = {};
              if(d.innerText.indexOf('P.when("sm-controller-thread", \'sm-view-threadList\'') > 0){
                message.buyer_id = d.innerText.split('\n')[5].trim().replace(/["|,]/g, '');
                var domid = buyer_email = d.innerText.split('\n')[8].trim().replace('"', '').replace('",', '');
                //message.domid = domid;
                message.subject = document.querySelector('#' + domid + ' .thread-subject').innerText;
                message.buyer_name = document.querySelector('#' + domid + ' .thread-buyername').innerText;
                message.buyer_email = document.querySelector('#' + domid + ' .a-size-small.hidden').innerText;
                if(message.subject.indexOf('Order information from Amazon') > -1){
                  message.order_id = message.subject.replace('Order information from Amazon seller MobvoiUS (Order: ', '').replace(')', '');
                }

                return message;

              } else {
                return null;
              }
            });

            data.message_list = data.message_list.filter(n=>n);

            console.log(data);
            sendtoServer(data, 'amazon.sellercentral.message');
          /*
            var json = {};
            json.comment_data = d;
            json.meta_data = meta;
            sendtoServer(json, 'wechat.article.comment');
            */
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

function showSidebar(){
  console.log('show');
}

function getStorage(key){
  return JSON.parse(localStorage[key]);
}

function appendStorage(key, data){
  if(localStorage.papa_local == 'false') return;
  console.log(key);
  console.log(data);
  console.log(getStorage(key));
  var list = getStorage(key);
  list.push(data);
  console.log(list);
  localStorage[key] = JSON.stringify(list);

  //return localStorage[key];
}

function init(){
  var manifest = chrome.runtime.getManifest();
  document.getElementById('brand').innerText = manifest.name; 
}
