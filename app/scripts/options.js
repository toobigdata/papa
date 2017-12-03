'use strict';

$(function(){
  init();
});



function loadConfig(){
  var phone = localStorage.phone || '';
  var isWechatAutoClose = localStorage.options_wechatAutoClose === 'true';
  var wechatHistoryMax = localStorage.options_wechatHistoryMax || 10;
  document.getElementById('phone').value = phone;

  if(phone.length == 11){
    document.getElementById('phone').disabled = true;
  }

  document.getElementById('input_wechatAutoClose').checked = isWechatAutoClose;
  document.getElementById('input_wechatHistoryMax').value = wechatHistoryMax;
  document.getElementById('input_wechatHistoryMax_show').innerText = wechatHistoryMax;
  $('#input_wechatHistoryMax').change(function(){
    wechatHistoryMax = document.getElementById('input_wechatHistoryMax').value;
    document.getElementById('input_wechatHistoryMax_show').innerText = wechatHistoryMax;
  });
}

document.getElementById('save').onclick = function () {

  var wechatHistoryMax = document.getElementById('input_wechatHistoryMax').value;
  if(isNaN(wechatHistoryMax) || wechatHistoryMax <= 0){
    alert('最大文章数必须是正整数');
    return;
  }


  var phone = document.getElementById('phone').value;
  var isWechatAutoClose = document.getElementById('input_wechatAutoClose').checked;
  localStorage.phone = phone;
  localStorage.options_wechatAutoClose = isWechatAutoClose;
  localStorage.options_wechatHistoryMax = wechatHistoryMax;
  showSyncStatus();
  chrome.runtime.sendMessage({ 'msgtype': 'command', 'command': 'updateSettings'}, function (response) {
    console.log(response);
  });
};

document.getElementById('clearstorage').onclick = function () {
  chrome.storage.local.clear(function () {
    console.log('storage cleared');
  });
};

function showSyncStatus() {
  document.getElementById('status').innerText = '已保存';
}
