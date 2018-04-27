'use strict';

$(function(){
  init();
	var source = getQuery(location.href, 'source') || 'douyin.video';
  document.querySelector('#source-name').innerText = config[source].display_name;

  for(var i in config){
    var li = '<option id="' + i + '" value="/mydata.html?source=' + i + '">' + config[i].display_name + '</option>';
    document.querySelector('#source').innerHTML += li;
  }

  $('#source').change(function(d){
    var url = $(this).children('option:selected').val();
    location.href = url;
  });



  var data = getData(source);
  var body = data.body;
  var head = data.head;
	console.log(data);

  var container = document.getElementById('basicData');
  var hot = new Handsontable(container, {
    data: body,
    height: 480,
    width: 1200,
		stretchH: 'all',
		contextMenu: true,
    rowHeaders: true,
    colHeaders: head,
    filters: true,
    sortIndicator: true,
    columnSorting: true,
    rowHeaders: true,
    dropdownMenu: true,
		readOnly: true,
      sortIndicator: true,

		autoColumnSize: {
			samplingRatio: 23
		}
  });



	var buttons = {
    file: document.getElementById('export-file')
  };

  var exportPlugin = hot.getPlugin('exportFile');
  //var resultTextarea = document.getElementById('result');

  buttons.file.addEventListener('click', function() {
    exportPlugin.downloadFile('csv', {filename: 'MyFile'});
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

function getData(source){
  var key = source;
  //console.log(key);

  var result = {}
	result.head = [];
	result.body = [];
	result.columns = [];
  var list = getStorage(key);

  var line = [];
  for(var i=0;i<config[key]['head'].length;i++){
    var item = config[key]['head'][i];
		result.head.push(item);
		result.columns.push({data: item, type: 'text'});
  }

  for(var i=0;i<list.length;i++){
    var item = list[i];
    var line = [];


    var line = [];
    for(var j=0;j<config[key]['field'].length;j++){
      var field = config[key]['field'][j];
      if(j===0) line.push(toLocalTime(item[field]));
      else line.push(item[field]);
    }
    result.body.push(line);
  }
  return result;
}


function wordFrequency(list, field){

  var dic = {};

  for(var i=0;i<list.length;i++){
    var item = list[i];
    var content = item[field];
    //var wordArray = content.replace(/[,'"\(\)\-]/g, ' ').split(' ');
    var wordArray = content.replace(/([\[\]\,.?"\(\)+_*\/\\&\$#^@!~`\n\-:]|(?!\s)'\s+|\s+'(?!\s)|(?!\s)"\s+|\s+"(?!\s))/g, ' ').split(' ');
    //console.log(wordArray);
    for(var j=0;j<wordArray.length;j++){
      if(dic[wordArray[j]]) dic[wordArray[j]] += 1;
      else dic[wordArray[j]] = 1;
    }
  }

  console.log(dic);
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
