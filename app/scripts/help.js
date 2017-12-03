'use strict';

$(function(){

  init();

  for(var i in config){
    var li = '<li><a href="/mydata.html?source=' + i + '">' + config[i].display_name + '</a></li>';
    document.querySelector('#source-list').innerHTML += li;
  }
});
