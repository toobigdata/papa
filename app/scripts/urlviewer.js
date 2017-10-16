$(function(){
  var wait = 5;
  document.getElementById('input_wait').value = wait;
  document.getElementById('input_wait_show').innerText = wait;
  $('#input_wait').change(function(){
    wait = document.getElementById('input_wait').value;
    document.getElementById('input_wait_show').innerText = wait;
  });

  $('#submit').click(function(){
    console.log(wait);
    var links = document.querySelector('#url-input').value;
    var crawlQueue = links.split('\n');
    console.log(crawlQueue);
    getData(crawlQueue, wait);
  });

});

function getData(crawlQueue, wait){
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
    }, wait * 1000);
};
