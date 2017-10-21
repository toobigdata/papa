(function() {
  'use strict';

  setTimeout(function(){
    crawl();
  }, 3*1000);

  addBtn('jz_crawl', '翻页爬', function(){
		var intervalId = setInterval(function(){
			if(crawlNextPage() < 0){
        clearInterval(intervalId);
        notify('数据抓取完毕');
      }
		}, 5*1000);
  });

})();

function crawl(){

  var data = {};
  data.url = location.href;
  data.title = document.title;

  var all = Array.from(document.querySelectorAll('.list-comments .comment-inner'));
  data.comment_list = all.slice(all.length - 50, all.length).map(function(d){
    return {
      author_name: d.querySelector('h3 a.author').innerText,
      author_link: d.querySelector('h3 a.author').href,
      comment_at: d.querySelector('.date a data').getAttribute('data-value'),
      content: d.querySelector('p').innerText,
    }
  });

  console.log(data);

  chrome.runtime.sendMessage({ 'msgtype': 'kickstater.project.comment', 'content': data}, function (response) {
    console.log(response);
  });

}

function crawlNextPage(){
	var btn = document.querySelector('a.older_comments');
	if(btn != null && btn.style.display !== 'none'){
    btn.click();
    setTimeout(function(){
      crawl();
      return 1;
    }, 1*1000);
  } else {
    return -1;
  }
}
