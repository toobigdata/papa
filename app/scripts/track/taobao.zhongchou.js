'use strict';

/******************************************************************************
 * 淘宝众筹 https://izhongchou.taobao.com/dreamdetail.htm
 *****************************************************************************/
$(function () {

  setTimeout(function(){
    crawl();
  }, 3*1000);

  addBtn('autoreload', '当页爬', function(){
    minuteReload();
  });

});


function crawl(){
  var id = getQuery(location.href, 'id');
  console.log(id);

  // 接口
  var dataUrl = 'https://izhongchou.taobao.com/dream/ajax/getProjectForDetail.htm?id=' + id + '&ac=&_ksTS=1503415363435_96&callback=';

	$.ajax({
		type: 'POST',
		url: dataUrl,
		data: {},
		success: function(d){
			console.log(d);
			//var data = JSON.parse(d);
			var data = d;

			for(var i=0;i<data.data.items.length;i++){
				delete(data.data.items[i].desc);
			}

      data = data.data;
      console.log(data);

			// 提交到后台处理
			chrome.runtime.sendMessage({ 'msgtype': 'taobao.zhongchou', 'content': data }, function (response) {
				console.log(response);
			});
		},
		dataType: 'JSON'
	});
}
