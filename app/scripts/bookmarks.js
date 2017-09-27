'use strict';

var bookmarks_md = '';
var bookmarks_html = '';
$(function(){
  chrome.bookmarks.getTree(function(d){
    //console.log(d);
    for(var i in d){
      getBookmark(d[i], 1);
    }
    document.getElementById('basicData').innerHTML = bookmarks_html;
  });
});


function getBookmark(d, level){
  if(d.url){
    bookmarks_md += '- [' + d.title + '](' + d.url + ')\n';
    bookmarks_html += '<a target="_blank" href="' + d.url + '">' + d.title + '</a><br>';
  } else {
    //console.log('a dictionary');
    bookmarks_html += '<h' + (level) + '>' + d.title + '</h' + (level) + '>\n';
    if(d.children){
      for(var i in d.children){
        getBookmark(d.children[i], level + 1);
      }
    }
  }
}
