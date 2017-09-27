'use strict';

chrome.webRequest.onBeforeSendHeaders.addListener(function (details) {
  //console.log(JSON.stringify(details));
  var headers = details.requestHeaders,
      blockingResponse = {};

  // Each header parameter is stored in an array. Since Chrome
  // makes no guarantee about the contents/order of this array,
  // you'll have to iterate through it to find for the
  // 'User-Agent' element
  for (var i = 0, l = headers.length; i < l; ++i) {
    if (headers[i].name == 'User-Agent') {
      //headers[i].value = '>>> Your new user agent string here <<<';
      headers[i].value = 'Mozilla/5.0 (Linux; U; Android 4.4.3; zh-cn; HTC 802w Build/KTU84L) AppleWebKit/533.1 (KHTML, like Gecko)Version/4.0 MQQBrowser/5.4 TBS/025489 Mobile Safari/533.1 MicroMessenger/6.3.13.49_r4080b63.740 NetType/WIFI Language/zh_CN';
      //console.log(headers[i].value);
      break;
    }
    // If you want to modify other headers, this is the place to
    // do it. Either remove the 'break;' statement and add in more
    // conditionals or use a 'switch' statement on 'headers[i].name'
  }

  blockingResponse.requestHeaders = headers;
  return blockingResponse;
}, { urls: ['*://mp.weixin.qq.com/*'] }, ['requestHeaders', 'blocking']);
