(function() {
  'use strict';
  // Your code here...
  //

  crawl();


  addBtn('jz_crawl', '翻页爬', function(){
		localStorage.crawlNextPage = 'true';
  });

  addBtn('jz_crawl_stop', '停止', function(){
		localStorage.crawlNextPage = 'false';
  });

  /*
  addBtn('jz_crawl', '翻页爬', function(){
		var intervalId = setTimeout(function(){
			if(crawlNextPage() < 0){
        notify('数据抓取完毕');
      }
		}, 10*1000);
  });
  */

  addBtn('autoreload', '当页爬', function(){
    minuteReload();
  });

})();

function crawl(){

  if(location.href != localStorage.lastUrl){
    location.href = location.href;
  }
  localStorage.lastUrl = location.href;

  setTimeout(getData,5*1000);

}

function getData(){
  var data = {};
  data.url = location.href;

  var scriptList = Array.from(document.querySelectorAll('script'));
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

      var pattern =  /(.*)\(Order: ([0-9\-]+)\)(.*)/;
      var group = message.subject.match(pattern);
      if(group && group[2]) message.order_id = group[2];



      return message;

    } else {
      return null;
    }
  });

  data.message_list = data.message_list.filter(n=>n);
  console.log(data.message_list);

  chrome.runtime.sendMessage({ 'msgtype': 'amazon.sellercentral.message', 'content': data}, function (response) {
    console.log(response);
    crawlNextPage();
  });
}


function crawlNextPage(){
	var btn = document.querySelector('li.a-last a');
	if(btn == null){
    return -1;
  } else {
		if(localStorage.crawlNextPage == 'true'){
			btn.click();
			setTimeout(function(){
				crawl();
				return 1;
			}, 5*1000);
		}
  }
}
