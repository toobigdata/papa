(function(window, document){

  chrome.runtime.sendMessage({ 'msgtype': 'getScript', 'url': location.href}, function (response) {
    //console.log(response);
    if(response === 'appendSidebar'){
      var sidebar = document.createElement('div');
      sidebar.id = 'jianzhi_sidebar';
      sidebar.innerHTML = '<a class="btn" href="#" id="minuteReload" title=""> 分钟监测 </a>';
      document.body.appendChild(sidebar);
      $('#minuteReload').click(function(){
        minuteReload();
        alert('成功加入监测，监测期间请勿关闭页面。微信分钟级监测最多持续 2 小时。');
      });
    } else {
      setTimeout(function(){
        var sidebar = document.createElement('div');
        if(location.href.indexOf('detail.tmall.com') > 0){
          sidebar.id = 'jianzhi_sidebar';
          sidebar.innerHTML = '<a class="btn" href="#" id="minuteReload" title=""> 自动翻页 </a>';
          document.body.appendChild(sidebar);
          $('#minuteReload').click(function(){
            tmallCommentNextPage();
          });
        }
      }, 3*1000);
    }
  });


})(window, document);

function minuteReload(){
  chrome.runtime.sendMessage({ 'msgtype': 'minuteReload' }, function (response) {
    //console.log(response);
  });
  console.log('minute');
}

function tmallCommentNextPage(){
  console.log('show comment');
  document.querySelector('#J_TabBar > li:nth-child(2)').click();

  console.log('next page');
  setInterval(function(){
    var btn = document.querySelector('.rate-paginator a:nth-last-child(1)');
    if(btn) btn.click()
  }, 3*1000);
}
