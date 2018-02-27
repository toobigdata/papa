'use strict';
var baseUrl = 'http://jianzhiim.com';


/******************************************************************************
 * 解析文章
 *****************************************************************************/
$(function () {



  var info = document.createElement('div');
  info.id = 'info';
  document.body.appendChild(info);

  // 创建文章对象
  var a = {}; 

  // 记录文章标识信息
  a.biz = getQuery(location.href, '__biz'); // 公众号唯一标识，注意等号也是 biz 的组成部分
  a.mid = getQuery(location.href, 'mid') || getQuery(location.href, 'appmsgid'); // 推送 ID，一次推送可包括 1-8 篇文章
  a.idx = getQuery(location.href, 'idx') || getQuery(location.href, 'itemidx'); // 单次推送中的文章位置，1 为「头条」
  a.sn = getQuery(location.href, 'sn'); // 暂不清楚含义
  a.uid = a.biz + '.' + a.mid + '.' + a.idx; // 生成唯一标识
  a.url = 'http://mp.weixin.qq.com/s?__biz=' + a.biz + '&mid=' + a.mid + '&idx=' + a.idx + '&sn=' + a.sn + '&3rd=MzA3MDU4NTYzMw==&scene=6#rd';
  a.location_href = location.href;

  // 记录访客信息
  a.uin = getQuery(location.href, 'uin'); // 用户 uin，也是 fakeid
  a.key = getQuery(location.herf, 'key'); // 用户 key
  a.pass_ticket = getQuery(location.href, 'pass_ticket');
  a.wxtoken = getWxVar('window.wxtoken'); // 暂不清楚
  a.devicetype = getWxVar('devicetype'); //.replace(/&amp;/g,'&');
  a.userUin = getWxVar('user_uin'); // 暂不清楚
  a.appmsg_token = getWxVar('appmsg_token'); // 暂不清楚

  // 记录公众号信息
  a.accountId = document.querySelectorAll('.profile_meta_value')[0].innerText;
  a.accountDes = document.querySelectorAll('.profile_meta_value')[1].innerText;
  a.user_name = getWxVar('user_name');

  // 记录文章基本属性
  a.title = document.querySelector('.rich_media_title').innerText; // 标题
  a.author = document.querySelector('#post-user').innerText; // 标题
  a.digest = getWxVar('msg_desc'); // 文章摘要，为作者手填或自动截取文章开头字符 
  a.cover = getWxVar('msg_cdn_url'); // 文章头图/封面
  a.oriUrl = getWxVar('msg_source_url'); // 原文链接
  a.ct = getWxVar('ct'); // 文章发布时间，Unix 时间戳（转换为 JS 时间戳时要乘 1000）
  a.source = getWxVar('source');
  a.scene = getWxVar('scene');
  if(a.scene===null) a.scene = 0; // 从 0 改为 6
  a.appmsg_type = getWxVar('appmsg_type');


  // 记录文章版权信息
  a.copyright_stat = getWxVar('_copyright_stat');
  a.ori_article_type = getWxVar('_ori_article_type');
  a.msg_source_url = getWxVar('msg_source_url');
  a.source_username = getWxVar('source_username') || '';
  a.source_mid = getWxVar('source_mid') || '';
  a.source_idx = getWxVar('source_idx') || '';
  a.publish_time = getWxVar('publish_time') || '';
  a.msg_link = getWxVar('msg_link') || '';
  a.srcid = getWxVar('srcid') || '';
  a.req_id = getWxVar('req_id') || '';

  // 记录其他信息
  a.user_name= getWxVar('user_name');
  a.user_name_new = getWxVar('user_name_new');
  a.version = getWxVar('version');
  a.is_limit_user = getWxVar('is_limit_user');
  a.round_head_img = getWxVar('round_head_img');
  a.ori_head_img_url = getWxVar('ori_head_img_url');
  a.appmsg_id = getWxVar('appmsgid');
  a.comment_enabled = getWxVar('comment_enabled');
  a.is_need_reward = getWxVar('is_need_reward');
  a.img_format = getWxVar('img_format');
  a.srcid = getWxVar('srcid');
  a.comment_id = getWxVar('comment_id');
  a.show_comment = getWxVar('show_comment');
  a.source_encode_biz = getWxVar('source_encode_biz');
  a.source_username = getWxVar('source_username');

  // 统计文章媒体信息
  a.linkCount = document.querySelectorAll('#js_content a').length;
  a.imageCount = document.querySelectorAll('#page-content img').length;
  a.voiceCount = document.querySelectorAll('mpvoice').length;
  a.musicCount = $('qqmusic').length;
  var videolist = document.querySelectorAll('iframe.video_iframe'); // 这个规则有问题
  a.videoCount = videolist.length;
  a.voteCount = document.querySelectorAll('.vote_area iframe').length;
  a.commentCount = -1;

  // 处理图片
  if (a.imageCount > 0) {
    $('img').each(function (index, item) {
      $(item).attr('src', $(item).attr('data-src'));
    });
  }


  // 处理语音
  if (a.voiceCount > 0) {
    $('mpvoice').each(function (index, item) {
      // 20150629 正文只能包含一个语音
      a.voice = [];
      var voiceId = $(item).attr('voice_encode_fileid');
      var src = 'https://res.wx.qq.com/voice/getvoice?mediaid=' + voiceId;
      var voiceTitle = decodeURIComponent($(item).attr('name'));

      // voice 中存储语音标题和地址
      a.voice.push({
        title: voiceTitle,
        src: src
      });


      var download = document.createElement('a');
      download.className = 'download-link';
      download.href = src;
      download.innerText = '下载';
      download.title = '右键另存为';

      $(item).append(download);
    });
  }

  // 处理音乐
  if (a.musicCount > 0) {
    a.music = [];
    $('qqmusic').each(function (index, item) {
      var s = {};
      s.musicid = $(item).attr('musicid');
      s.mid = $(item).attr('mid');
      s.qqmusicurl = 'http://y.qq.com/#type=song&mid=' + s.mid;
      s.albumurl = 'http://i.gtimg.cn/music/photo/mid_album_300' + $(item).attr('albumurl');
      s.audiourl = $(item).attr('audiourl');
      s.music_name = $(item).attr('music_name');
      s.commentid = $(item).attr('commentid');
      s.singer = $(item).attr('singer');
      s.src = 'https://mp.weixin.qq.com' + $(item).attr('src');
      a.music.push(s);
    });
    //console.log(a.music);
  }

  // 处理视频
  if (a.videoCount > 0) {
    a.video = [];
    $(videolist).each(function (index, item) {
      var src = $(item).attr('data-src');
      // 视频有两类，微信视频和腾讯视频，需要处理
      a.video.push(src);
    });
    //console.log(a.video);
  }

  // 记录原始页面信息（不能记录，否则内容太长无法发送）
  a.html = document.body.innerHTML.toString(); // 原始网页内容

  console.log(a);


  console.log('Get article object done');
  //console.log(a);

  // 提交到后台处理
  chrome.runtime.sendMessage({ 'msgtype': 'wechat.article.content', 'content': a, 'detail': { 'appmsg_token': a.appmsg_token} }, function (response) {
    console.log(response);
  });




  var profileLink = document.createElement('a');
  profileLink.innerText = '+历史消息+';
  profileLink.className = 'rich_media_meta rich_media_meta_link';
  profileLink.href = location.href.replace('https://mp.weixin.qq.com/s?', 'https://mp.weixin.qq.com/mp/profile_ext?action=home&');
  document.querySelector('#meta_content').appendChild(profileLink);

});


/******************************************************************************
 * 从当前页面内容中提取变量
 *****************************************************************************/
function getWxVar(index) {
  var content = document.body.innerHTML;
  var re = new RegExp('var ' + index + ' + = [\"\'](.+)[\"\']');
  var a = content.match(re);
  if (!a) return null;
  var a = a[0];
  if (!a) return null;
  if (index == 'msg_source_url') {
    var s = a.indexOf('\'');
    var e = a.lastIndexOf('\'');
  } else {
    var s = a.indexOf('"');
    var e = a.lastIndexOf('"');
  } 

  return a.substring(s + 1, e);
}
