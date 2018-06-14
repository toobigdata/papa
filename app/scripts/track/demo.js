var source = 'demo';

(function() {
  'use strict';
  // Your code here...
	crawl();

})();

function crawl(){

  var data = {};
  data.url = location.href;
  console.log(data);

  /*
  chrome.runtime.sendMessage({ 'msgtype': source 'content': data}, function (response) {
    console.log(response);
  });
  */

}

