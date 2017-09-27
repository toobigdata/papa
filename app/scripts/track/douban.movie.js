'use strict';

/******************************************************************************
 * 解析文章
 *****************************************************************************/
$(function () {
  crawl();
});

function crawl(){
  console.log('movie');
  var movie = {}
  movie.ts = new Date().getTime();
  movie.name = document.querySelector('#content > h1 > span:nth-child(1)').innerText;
  movie.score =  parseFloat(document.querySelector('.rating_num').innerText);
  movie.rating_people = parseInt(document.querySelector('.rating_people span').innerText); //未上映电影没有这个数据，需要兼容
  var per = document.querySelectorAll('.rating_per');
  movie.percentage = {
    '5': per[0].innerText, 
    '4': per[1].innerText,
    '3': per[2].innerText, 
    '2': per[3].innerText, 
    '1': per[4].innerText
  };

  movie.short_commentCount = parseInt(document.querySelector('#comments-section > div.mod-hd > h2 > span > a').innerText.match(/\d+/));
  movie.commentCount = parseInt(document.querySelector('#content > div.grid-16-8.clearfix > div.article > section > header > h2 > span > a').innerText.match(/\d+/));
  movie.questionCount = parseInt(document.querySelector('#askmatrix > div.mod-hd > h2 > span > a').innerText.match(/\d+/));
  movie.discussCount = parseInt(document.querySelector('#content > div.grid-16-8.clearfix > div.article > div.section-discussion > p > a').innerText.match(/\d+/));
  movie.url = location.href;

  console.log(movie);

  chrome.runtime.sendMessage({ 'msgtype': 'douban.movie', 'content': movie }, function (response) {
    console.log(response);
  });
}
