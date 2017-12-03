'use strict';

$(function(){
  init();
	var source = getQuery(location.href, 'source') || 'wechat.article.content';
  document.querySelector('#source-name').innerText = config[source].display_name;

  for(var i in config){
    var li = '<option id="' + i + '" value="/mydata.html?source=' + i + '">' + config[i].display_name + '</option>';
    document.querySelector('#source').innerHTML += li;
  }

  $('#source').change(function(d){
    var url = $(this).children('option:selected').val();
    location.href = url;
  });


  renderBasic(source);




  $('table').DataTable({
    'paging': true,
    "pageLength": 200,
    'order': [[ 0, 'desc' ]],
    'buttons': [
        'excelHtml5'
    ]
  });

  $('#' + source).addClass('active');
  $('#clearStorage').click(function(){
    localStorage[source] = '[]';
    console.log('clear');
		alert('清空成功');
		chrome.tabs.reload();
  });
});

function redirect(url){
  console.log(url);
  location.href = url;
}

function toLocalTime(date) {
	var local = new Date(date);
	local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
	return local.toJSON().replace('T', ' ').slice(0, 19);
}

var sync = localStorage.sync;
if (sync === 'true') {
  $('#more').show();
}


function renderBasic(source) {
  var key = source;
  //console.log(key);

  var table = '<h3>最新爬取数据</h3><table id="basic" style="width:100%"><thead><tr>';
  for(var i=0;i<config[key]['head'].length;i++){
    var item = config[key]['head'][i];
    table += '<td>' + item + '</td>';
  }
  table += '</tr></thead><tbody id="basic_body"></tbody></table>';
  document.getElementById('basicData').innerHTML = table;

  var list = getStorage(key);

  for(var i=0;i<list.length;i++){
    var tr = '<tr>';
    var item = list[i];
    for(var j=0;j<config[key]['field'].length;j++){
      var field = config[key]['field'][j];
      if(j===0) tr += '<td>' + toLocalTime(item[field]) + '</td>';
      else tr += '<td>' + item[field] + '</td>';
    }
    tr += '</tr>';
    document.getElementById('basic_body').innerHTML += tr;
  }
}

function renderDetail(source) {
  var key = source;
  var detail_selector = config[key]['detail_selector'];
  if(source === 'wechat.article' && detail_selector){
    var table = '<h3>最近 1 条详细数据</h3><table id="detail" style="width:100%"><thead><tr>';
    for(var i=0;i<config[key]['detail_head'].length;i++){
      var item = config[key]['detail_head'][i];
      table += '<td>' + item + '</td>';
    }
    table += '</tr></thead><tbody id="detail_body"></tbody></table>';

    document.getElementById('detailData').innerHTML = table;

    //console.log(detail_selector);
    var list = JSON.parse(localStorage[key])[detail_selector.split('.')[0]][detail_selector.split('.')[1]];
    //console.log(list);
    for(var i=0;i<list.length;i++){
      var tr = '<tr>';
      var item = list[i];
      for(var j=0;j<config[key]['detail_field'].length;j++){
        var field = config[key]['detail_field'][j];
        tr += '<td>' + item[field] + '</td>';
      }
      tr += '</tr>';
      document.getElementById('detail_body').innerHTML += tr;
    }
  }
}
