var historyMax = localStorage.options_wechatHistoryMax || 10;
var crawlQueue = [];
var currentCount = 1;
$(function(){
  init();
  currentCount = 1;
  getData(0);
});

var inputUrl = location.href;
var apibase = 'https://mp.weixin.qq.com/mp/profile_ext';
var devicetype = getQuery(location.href, 'devicetype');
var version = getQuery(location.href, 'version');
var ascene = getQuery(location.href, 'ascene');
var appmsg_token = getQuery(location.href, 'appmsg_token');


// https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MjM5ODM4NzM5Mg==&scene=123&uin=MTIwMTIyMzU1&key=f55c19130053f5f53686b7f09e581946fd436612c32ea6c38d280aa5e5fdc87a6d1c1b76f24d72c62ce58fc43c7e52799ec3a52fd61316d2c504e511d4b3f4fa43c6eb5952fc3732e9b911b3a9e4fbd3&devicetype=iMac+MacBookPro12%2C1+OSX+OSX+10.13.3+build(17D47)&version=12020810&lang=zh_CN&nettype=WIFI&a8scene=0&fontScale=100&pass_ticket=7cMXLTYeaYCsDNA8swvgnu7FRBdSMRmA%2FJkoSBhIFzc%3D
// https://mp.weixin.qq.com/mp/profile_ext?action=getmsg&__biz=MjM5ODM4NzM5Mg==&f=json&offset=31&count=10&is_ok=1&scene=123&uin=MTIwMTIyMzU1&key=da75b846f73de59a5be2fd87e3e45709273aecd49562019633878f85ffe097da46ed68a6ad87bc4f34a574754e66b6a13917fdd3fe3b5f6bff00942063c2c2e5355e72f34a46d4251d55ce35da9c2360&pass_ticket=7cMXLTYeaYCsDNA8swvgnu7FRBdSMRmA%2FJkoSBhIFzc%3D&wxtoken=&appmsg_token=945_rZShB8%252BSXu0Y7%252F0D85NN5RMjZnFBj3YEOYQHGg~~&x5=0&f=json

var q = {
  'action'         : 'getmsg',
  '__biz'          : getQuery(inputUrl, '__biz'),      // * Unique id of an Offical Account
  'f'              : 'json',
  'offset'         : 0,
  //'frommsgid'      : '',
  'count'          : 10,
  'is_ok'          : 1,
  'scene'          : 123,
  'uin'            : getQuery(inputUrl, 'uin'),        // Unique id of a Wechat User
  'key'            : getQuery(inputUrl, 'key'),
  'pass_ticket'    : getQuery(inputUrl, 'pass_ticket'),
  //'uin'            : 777,
  //'key'            : 777,
  'wxtoken'        : '',
  'appmsg_token'   : appmsg_token,
  'x5'             : 0
}

// 获取公众号历史文章

function getData(offset){

  console.log('currentCount=' + currentCount + ' | historyMax=' + historyMax);

  if(offset !== null && offset !== undefined){
    q.offset = offset;
    //console.log('offset=' + offset);
  } else {
    q.offset = 0;
  }

  var queryString = '';
  for(var atr in q) {
    queryString += atr + '\=' + q[atr] + '&';
  }

  var apiurl = apibase + '\?' + queryString;
  //apiurl += ' HTTP/1.1';
  console.log(apiurl);

  var historyHR = createXmlHttpRequest();
  historyHR.open('GET', apiurl, false);
  historyHR.setRequestHeader('Content-Type', 'application/json');
  historyHR.send();

  //console.log(historyHR);

  currentCount ++;
  var a =  JSON.parse(historyHR.response);
  //console.log('--------------');
  console.log(a);

  var list = a.general_msg_list;
  if(!list){
    console.log('no list found 1');
    return 0;
  }

  var list = JSON.parse(list).list;
  if(!list || list.length == 0){
    console.log('no list found 2');
  } else {

    list.forEach(function(item, callback) {
      var comm = item.comm_msg_info;
      var ext = item.app_msg_ext_info;
      if(ext){

        var line = ext.content_url.replace(/\&amp\;/ig,'&') + '\n';
        renderLine(line);

        if(ext.is_multi == 1){
          for(j=0;j<ext.multi_app_msg_item_list.length;j++){
            // The database file method
            var articleUrl = ext.multi_app_msg_item_list[j].content_url.replace(/\&amp\;/ig,'&');

            // The local file method
            var line = ext.multi_app_msg_item_list[j].content_url.replace(/\&amp\;/ig,'&') + '\n';
            renderLine(line);
          }
        }
      } else {
        //console.log('no ext');
      }
    });
  }

  if(a.can_msg_continue !== undefined && a.can_msg_continue === 1 && currentCount <= historyMax){
    document.getElementById('log').innerHTML += '.';
    document.getElementById('rows').innerText = (parseInt(document.getElementById('rows').innerText) + 1);
    console.log('next page');
      setTimeout(function(){
        getData(a.next_offset);
      }, 2*1000);
  } else {
    console.log('last page');
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.innerText = '已经翻到最后一页';
    a.target = '_blank';
    li.appendChild(a);
    document.getElementById('articles').appendChild(li);
    //console.log(crawlQueue);
    document.getElementById('log').style='display:none;'
    document.getElementById('articles').style='display:normal;'

    var intervalId = setInterval(function(){
      var url = crawlQueue.shift();
      //console.log(url);
      if(!url) clearInterval(intervalId);
      chrome.tabs.create({
          index: 0,
          url: url,
          active: false,
          pinned: false,
      }, function(tab){
          //console.log(tab);
          //sendResponse('opened the url');
      });
    }, 5000);
  }

};


function renderLine(line){
  if(line.length > 10){
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.innerText = line.replace(/\n/g,'');
    a.href = line.replace(/#wechat_redirect/,'') + '&uin=' + q.uin + '&key=' + q.key + '&pass_ticket=' + q.pass_ticket + '&devicetype=' + devicetype + '&version=' + version + '&ascene=' + ascene + '&appmsg_token' + appmsg_token + '##wechat_redirect';

    crawlQueue.push(a.href);

    a.target = '_blank';
    li.appendChild(a);
    document.getElementById('articles').appendChild(li);
  }
}
