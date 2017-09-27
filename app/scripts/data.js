'use strict';

$(function(){
	var source = getQuery(location.href, 'source') || 'wechat.article';
  //console.log(source);
  //renderDetail(source);
  for(var i in config){
    //console.log(i);
    //console.log(config[i].display_name);
    var li = '<li><a href="/mydata.html?source=' + i + '" id="' + i + '">' + config[i].display_name + '</a></li>';
    document.querySelector('#source').innerHTML += li;
  }

  renderBasic(source);
  $('table').DataTable({
    'paging': true,
    'order': [[ 0, 'desc' ]]
  });

  $('#' + source).addClass('active');
  $('#clearStorage').click(function(){
    localStorage[source + '.basic'] = '';
    console.log('clear');
		alert('清空成功');
		chrome.tabs.reload();
  });
});

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
  var table = '<h3>历史数据</h3><table id="basic" style="width:100%"><thead><tr>';
  for(var i=0;i<config[key]['head'].length;i++){
    var item = config[key]['head'][i];
    table += '<td>' + item + '</td>';
  }
  table += '</tr></thead><tbody id="basic_body"></tbody></table>';
  document.getElementById('basicData').innerHTML = table;

  var list = '[' + localStorage[key + '.basic'].replace(/,$/, '') + ']';
  list = JSON.parse(list);

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
