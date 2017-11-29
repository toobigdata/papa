(function(window, document){
  run();
})(window, document);


function notify(text){
  notie.alert({ text: text, time: 3});
}

function addBtn(id, text, func){
  var btn = document.createElement('div');
  btn.id = id;
  btn.className = 'jz_btn';
  btn.innerHTML = text;
  document.querySelector('#jz_sidebar .sidebar-body').appendChild(btn);
  $('#' + id).click(func);
}

function run(){
  chrome.runtime.sendMessage({ 'msgtype': 'getScript', 'url': location.href}, function (response) {
    //console.log(response);
    if(response === 'appendSidebar'){

      notify('在当前页面发现可爬数据');

      var sidebar = document.createElement('div');
      sidebar.id = 'jz_sidebar';
      sidebar.innerHTML = '<div class="sidebar-header">问问爬爬</div><div class="sidebar-body"></div>';
      document.body.appendChild(sidebar);
      $('#minuteReload').click(function(){
        minuteReload();
        alert('成功加入监测，监测期间请勿关闭页面。微信分钟级监测最多持续 2 小时。');
      });

      var jz_sidebar = document.getElementById('jz_sidebar');
      
      jz_sidebar.addEventListener("mouseover", function(e){
        jz_sidebar.classList.add('full');
      })

      jz_sidebar.addEventListener("mouseout", function(e){
        jz_sidebar.classList.remove('full');
      })

    } else {
      setTimeout(function(){
        var sidebar = document.createElement('div');
        if(location.href.indexOf('detail.tmall.com') > 0){
          /*
          sidebar.id = 'jianzhi_sidebar';
          sidebar.innerHTML = '<a class="btn" href="#" id="minuteReload" title=""> 自动翻页 </a>';
          document.body.appendChild(sidebar);
          $('#minuteReload').click(function(){
            tmallCommentNextPage();
          });
          */
        }
      }, 3*1000);
    }
  });
}

function minuteReload(){
  chrome.runtime.sendMessage({ 'msgtype': 'minuteReload' }, function (response) {
    //console.log(response);
    if(response == 'running') {
      document.title = '[正在爬取，每分钟刷新]' + document.title;
    }
  });
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
