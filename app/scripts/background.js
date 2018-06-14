'use strict'

//console.log('start');


// 全局设置
var data_upload_url = 'http://pcsdpku.com/jz/index.php';

var phone, isWechatAutoClose, wechatHistoryMax;
isWechatAutoClose = localStorage.options_wechatAutoClose || 'false';

localStorage.papa_switch = localStorage.papa_switch || 'true';
localStorage.papa_local = localStorage.papa_local || 'true';
localStorage.options_wechatAutoClose = localStorage.options_wechatAutoClose || 'false';
localStorage.phone = localStorage.phone || '';
localStorage.url = localStorage.url || '';

for(var i in config){
  localStorage[i] = localStorage[i] || '[]';
}


function sendtoServer(data, source) {

  var manifest = chrome.runtime.getManifest();
  var crxVersion = manifest.version;
  var ts = new Date();
  var today = ts.getFullYear() + '-' + ('0' + (ts.getMonth() + 1)).slice(-2) + '-' + ('0' + ts.getDate()).slice(-2);

  var url = data_upload_url;

	$.ajax({
			type: 'POST',
			url: url,
			data: JSON.stringify({
       // 'service_key': 'papa',
       // 'details':{
          'uid': phone,
       //   'dim1': source,
          'source': source,
          'data': JSON.stringify(data),
          'timestamp': ts.getTime(),
          'event_date': today,
          'version': crxVersion
       //   'value': 1
       // }
			}),
			success: function(d) { 
        //console.log(d); 
      },
			contentType: 'application/json',
			dataType: 'json'
	});
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {

  var tabId = sender.tab.id;
  if (message.msgtype == 'getScript') {

    var source = getSource(sender.url);
    //console.log(source);

    if(localStorage.papa_switch == 'true' && source !== 0){
      chrome.tabs.executeScript(tabId, {file: 'scripts/track/' + source + '.js'});
      sendResponse('appendSidebar');
    }
  } else if (message.msgtype == 'minuteReload') {

      setInterval(function(){
        chrome.tabs.reload(tabId);
        setTimeout(function(){
          chrome.tabs.executeScript(tabId,{code:"document.title = '[Running]' + document.title"});
        }, 3*1000);

      }, 50*1000);

      sendResponse('running');
  } else if (message.msgtype == 'checkStatus') {

    if(isOn === 'true'){
      sendResponse('on');
    } else {
      sendResponse('off');
    }
  
  } else if(message.msgtype == 'command') {
    if(message.command === 'closeAllWxTabs') closeTabs();
    else if(message.command === 'updateSettings'){
      updateSettings();
      sendResponse('settings updated');
    }
    else if(message.command === 'openUrl'){
      localStorage.url += message.url + ',';
    }
  } else {

    //var source = message.msgtype.replace('_', '.');
    sendResponse('Data received');
    var source = message.msgtype;

    var data = message.content;
    if(!data) return;
    var stat_ts = new Date();
    data.ts = stat_ts;

    sendtoServer(data, source);

    // 暂不保存

    //console.log(config[source]);

    if(data == undefined) return;

    //console.log('config[source].list');
    //console.log(config[source]);

    if(config[source].list){
      //console.log('list');
      data = data[config[source].list];
      //console.log(data);
      for(var i=0;i<data.length;i++){
        //console.log(data[i]);
        data[i].ts = stat_ts;
        appendStorage(source, data[i]);
      }
    } else {
      appendStorage(source, data);
      if(message.detail && message.detail.appmsg_token){
        localStorage.appmsg_token = message.detail.appmsg_token;
      };
    }

    /*
    for(var i in data){
      console.log(typeof(data[i]));
      if(i != 'ts' && typeof(data[i]) == Object){
        delete(data[i]);
      }
    }
    */

  
  }

});

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
  console.log('--------------------close tabs-----------------');
  chrome.tabs.query({ 'status': 'complete', 'url': '*://kuaishou.com/*' }, function (tabs) {
    //console.log(tabs);
    var tabIds = $.map(tabs, function (value, index) {
      return tabs[index].id;
    });
    chrome.tabs.remove(tabIds);
  });
  chrome.tabs.query({ 'status': 'complete', 'url': '*://mp.weixin.qq.com/*pass_ticket*' }, function (tabs) {
    //console.log(tabs);
    var tabIds = $.map(tabs, function (value, index) {
      return tabs[index].id;
    });
    chrome.tabs.remove(tabIds);
  });
  chrome.tabs.query({ 'status': 'complete', 'url': '*://www.kickstarter.com/profile/*' }, function (tabs) {
    //console.log(tabs);
    var tabIds = $.map(tabs, function (value, index) {
      return tabs[index].id;
    });
    chrome.tabs.remove(tabIds);
  });
  chrome.tabs.query({ 'status': 'complete', 'url': '*://www.douyin.com/*' }, function (tabs) {
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
    //console.log('local storage clear');
  });
}

function getSource(url) {
  for(var i in config){
    for(var j=0;j<config[i]['url_re'].length;j++){
      var re = new RegExp(config[i]['url_re'][j], 'i');
      //console.log(re);
      if(url.match(re)) return i;
    }
  }
  return 0;
}

// 监听发送请求 天猫京东评论
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    getComments(details.url);
    //console.log(details.url);
    return {redirectUrl: chrome.extension.getURL("returnjs.js")};
  },
  {
    urls: [
        "*://rate.tmall.com/list_detail_rate.htm*",
        "*://club.jd.com/comment/productPageComments.action*",
        "*://sclub.jd.com/comment/productPageComments.action*"
    ],
    types: ["script"]
  },
  []
);

// 监听发送请求 抖音用户页视频列表
chrome.webRequest.onCompleted.addListener(
  function(details) {

    /*
    console.log('---------------');
    console.log(details);
    console.log(details.url);
    console.log(details.url.indexOf("do_not"));
    */

		if(localStorage.douyin_user_post && localStorage.douyin_user_post == details.url) return {redirectUrl: chrome.extension.getURL("returnjs.js")};
    
    getDouyinUserVideos(details.url);

  },
  {
    urls: [
        "https://www.douyin.com/aweme/v1/aweme/post/*"
    ],
    types: ["xmlhttprequest"]
  },
  []
);

// 监听发送请求 微信EXT
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    //getComments(details.url);
    
		if (details.url.endsWith("do_not")) {
			console.log('do not modify');
			return {redirectUrl: chrome.extension.getURL("returnjs.js")};
		}

		if(details.url.indexOf('appmsg_comment') > 0){
			getWxData(details, 'comment');
		} else if(details.url.indexOf('getappmsgext') > 0){
			getWxData(details, 'ext');
		}
		return {redirectUrl: chrome.extension.getURL("returnjs.js")};
  },
  {
    urls: [
        "https://mp.weixin.qq.com/mp/getappmsgext?*",
        "*://mp.weixin.qq.com/mp/appmsg_comment*"
    ],
    types: ["xmlhttprequest"]
  },
  []
);


/*
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    //getComments(details.url);
    
		if (details.url.endsWith("do_not")) {
			console.log('do not modify');
			return {redirectUrl: chrome.extension.getURL("returnjs.js")};
		}

		if(1){
			getAmazonSellerMessageData(details);
		}
		return {redirectUrl: chrome.extension.getURL("returnjs.js")};
  },
  {
    urls: [
        "https://sellercentral.amazon.com/messaging/inbox/ajax/load-threads"
    ],
    types: ["xmlhttprequest"]
  },
  []
);
*/

/*
      var readsuccess = message.content.readCount;
      if(readsuccess === -1) {
        chrome.browserAction.setIcon({ path: { '19': 'images/icon19_gray.png' } });
        chrome.browserAction.setIcon({ path: { '38': 'images/icon38_gray.png' } });
        console.log('icon changed to gray');
      } else {
        chrome.browserAction.setIcon({ path: { '19': 'images/icon19.png' } });
        chrome.browserAction.setIcon({ path: { '38': 'images/icon38.png' } });
        console.log('icon changed to active');
      }
*/

daemon();
