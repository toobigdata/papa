var _AnalyticsCode = 'UA-79388719-4';
var _gaq = _gaq || [];
_gaq.push(['_setAccount', _AnalyticsCode]);
_gaq.push(['_trackPageview']);
(function() {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
})();
function trackButtonClick(e) {
  _gaq.push(['_trackEvent', e.target.id, 'clicked']);
}
document.addEventListener('DOMContentLoaded', function () {
  var buttons = document.querySelectorAll('a');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', trackButtonClick);
  }
});

function getQuery(url, name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  //console.log(name);
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
      results = regex.exec(url);

  //console.log(results);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function createXmlHttpRequest() {
  if (window.ActiveXObject) {
    //如果是IE浏览器 
    return new ActiveXObject('Microsoft.XMLHTTP');
  } else if (window.XMLHttpRequest) {
    //非IE浏览器 
    return new XMLHttpRequest();
  }
}

function correct(url) {
  if(url.indexOf('__biz') > 0 && url.indexOf('mid') > 0 && url.indexOf('idx') > 0) return true;
  if(url.indexOf('__biz') > 0 && url.indexOf('appmsgid') > 0 && url.indexOf('itemidx') > 0) return true;
  return false;
}

