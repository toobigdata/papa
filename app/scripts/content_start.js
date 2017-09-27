(function(window, document){
  chrome.runtime.sendMessage({ 'msgtype': 'getScript', 'url': location.href}, function (response) {
    console.log(response);
    if(response === 'appendSidebar'){
      var sidebar = document.createElement('div');
      sidebar.id = 'jianzhi_sidebar';
      sidebar.innerHTML = '<a class="btn" href="#" id="minuteReload" title=""> 分钟监测 </a>';
      document.body.appendChild(sidebar);
      $('#minuteReload').click(function(){
        minuteReload();
        alert('成功加入监测，监测期间请勿关闭页面。微信分钟级监测最多持续 2 小时。');
      });
    }
  });
})(window, document);

function minuteReload(){
  chrome.runtime.sendMessage({ 'msgtype': 'minuteReload' }, function (response) {
    //console.log(response);
  });
  console.log('minute');
}
