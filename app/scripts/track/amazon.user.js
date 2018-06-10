(function() {
  'use strict';
  // Your code here...
  //

  console.log('amazon.user');
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

  setTimeout(getData,3*1000);

}

function getData(){
  var data = {};
  data.url = location.href;

    
  if(document.body.innerHTML.indexOf('window.CustomerProfileRootProps = {"locale":"en-US","customerId"') > 0){

    var content = document.body.innerHTML;
    var re = new RegExp('.*window.CustomerProfileRootProps = (.+);');
    var a = content.match(re);
    var data = {};
    data = JSON.parse(a[1]);
    var customerId = data.customerId;
    notify('CustomerID: ' + data.customerId);
    //alert('CustomerID: ' + JSON.parse(a[1]).customerId);
    data.url = 'https://www.amazon.com/gp/profile/' + data.directedId + '/';
    
    chrome.runtime.sendMessage({ 'msgtype': 'amazon.user', 'content': data}, function (response) {
      console.log(response);
      //crawlNextPage();
    });

  } else {
    return null;
  }

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
