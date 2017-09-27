'use strict';

var b = {};
b.ua_string = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13F69 MicroMessenger/6.3.16 NetType/WIFI Language/zh_CN';
b.vendor = 'Apple Computer, Inc.';
b.platform = 'iPhone';

document.addEventListener('beforeload', function (e) {
  Object.defineProperty(window.navigator, 'userAgent', { get: function get() {
      return b.append_to_default_ua ? navigator.userAgent + ' ' + b.ua_string : b.ua_string;
    } });
  Object.defineProperty(window.navigator, 'vendor', { get: function get() {
      return b.vendor;
    } });
  if (b.platform) {
    Object.defineProperty(window.navigator, 'platform', { get: function get() {
        return b.platform;
      } });
  }
}, true);

var a = document.createElement('script');
a.type = 'text/javascript';
a.innerText += 'Object.defineProperty(window.navigator, \'userAgent\', { get: function(){ return \'' + (b.append_to_default_ua ? navigator.userAgent + ' ' + b.ua_string : b.ua_string) + '\'; } });';
a.innerText += 'Object.defineProperty(window.navigator, \'vendor\', { get: function(){ return \'' + b.vendor + '\'; } });';
if (b.platform) {
 a.innerText += 'Object.defineProperty(window.navigator, \'platform\', { get: function(){ return \'' + b.platform + '\'; } });';
}
document.documentElement.insertBefore(a, document.documentElement.firstChild);
