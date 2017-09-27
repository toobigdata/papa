var historyMax = localStorage.options_wechatHistoryMax || 10;
var crawlQueue = [];
var currentCount = 1;
$(function(){
  currentCount = 1;
  getData(0);
});

var inputUrl = location.href;
//var apibase = 'https://mp.weixin.qq.com/mp/profile_ext?action=getmsg&__biz=MjM5MzE3OTAwMw==&f=json&offset=11&count=10&is_ok=1&scene=124&uin=777&key=777&pass_ticket=&wxtoken=&appmsg_token=919_pNr22cEgp5kh1EWbBqtkD97SGYwQq0jT_i-X6A~~&x5=0&f=json';
var apibase = 'https://mp.weixin.qq.com/mp/profile_ext';
var devicetype = getQuery(location.href, 'devicetype');
var version = getQuery(location.href, 'version');
var ascene = getQuery(location.href, 'ascene');

var q = {
  'action'         : 'getmsg',
  '__biz'          : getQuery(inputUrl, '__biz'),      // * Unique id of an Offical Account
  'f'              : 'json',
  'offset'         : 0,
  'frommsgid'      : '',
  'count'          : 10,
  'is_ok'          : 1,
  'uin'            : 777,
  'key'            : 777,
  'pass_ticket'    : '',
  'wxtoken'        : '',
  'x5'             : 0
  //'uin'            : getQuery(inputUrl, 'uin'),        // * Unique id of a Wechat User
  //'key'            : getQuery(inputUrl, 'key'),
  //'pass_ticket'    : getQuery(inputUrl, 'pass_ticket')
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
  apiurl += ' HTTP/1.1';
  //console.log(apiurl);

  var historyHR = createXmlHttpRequest();
  historyHR.open('GET', apiurl, false);
  historyHR.setRequestHeader('Content-Type', 'application/json');
  historyHR.send();

  //console.log(historyHR);

  currentCount ++;
  var a =  JSON.parse(historyHR.response);
  //console.log('--------------');
  //console.log(a);

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
    a.href = line.replace(/#wechat_redirect/,'') + '&uin=' + q.uin + '&key=' + q.key + '&pass_ticket=' + q.pass_ticket + '&devicetype=' + devicetype + '&version=' + version + '&ascene=' + ascene + '##wechat_redirect';

    crawlQueue.push(a.href);

    a.target = '_blank';
    li.appendChild(a);
    document.getElementById('articles').appendChild(li);
  }
}
