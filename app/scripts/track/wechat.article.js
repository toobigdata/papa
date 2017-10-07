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

  /*
  if(location.href.indexOf('pass_ticket') < 0) {
    $('.qr_code_pc').hide();
    renderErr(a);
    return;
  }
  */

  // 记录访客信息
  a.uin = getQuery(location.href, 'uin'); // 用户 uin，也是 fakeid
  a.key = getQuery(location.herf, 'key'); // 用户 key
  a.pass_ticket = getQuery(location.href, 'pass_ticket');
  a.wxtoken = getWxVar('window.wxtoken'); // 暂不清楚
  a.devicetype = getWxVar('devicetype'); //.replace(/&amp;/g,'&');
  a.userUin = getWxVar('user_uin'); // 暂不清楚

  // 记录公众号信息
  a.accountId = document.querySelectorAll('.profile_meta_value')[0].innerText;
  a.accountDes = document.querySelectorAll('.profile_meta_value')[1].innerText;
  a.user_name = getWxVar('user_name');

  // 记录文章基本属性
  a.title = getWxVar('msg_title'); // 标题
  a.author = getWxVar('nickname'); // 公众号名称
  a.digest = getWxVar('msg_desc'); // 文章摘要，为作者手填或自动截取文章开头字符 
  a.cover = getWxVar('msg_cdn_url'); // 文章头图/封面
  a.oriUrl = getWxVar('msg_source_url'); // 原文链接
  a.ct = getWxVar('ct'); // 文章发布时间，Unix 时间戳（转换为 JS 时间戳时要乘 1000）
  a.source = getWxVar('source');
  a.scene = getWxVar('scene');
  if(a.scene===null) a.scene = 0; // 从 0 改为 6
  a.appmsg_type = getWxVar('appmsg_type');


  // 记录文章版权信息
  a.copyrightStat = getWxVar('_copyright_stat');
  a.ori_article_type = getWxVar('_ori_article_type');
  a.msg_source_url = getWxVar('msg_source_url');
  a.source_username = getWxVar('source_username') || '';
  a.source_mid = getWxVar('source_mid') || '';
  a.source_idx = getWxVar('source_idx') || '';

  // 记录其他信息
  //a.user_name_new = getWxVar('user_name_new');
  //a.version = getWxVar('version');
  //a.is_limit_user = getWxVar('is_limit_user');
  //a.appmsg_id = getWxVar('appmsgid');
  //a.comment_enabled = getWxVar('comment_enabled');
  //a.is_need_reward = getWxVar('is_need_reward');
  a.img_format = getWxVar('img_format');
  a.srcid = getWxVar('srcid');
  a.comment_id = getWxVar('comment_id');
  a.show_comment = getWxVar('show_comment');

  // 统计文章媒体信息
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
      /*
      a.voice.push({
        title: voiceTitle,
        src: src
      });
      */
      a.voice.push(src);


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


  // 以 ext 方式获取阅读点赞数
  var appmsgextUrl = 'https://mp.weixin.qq.com/mp/getappmsgext?__biz=' + a.biz + '&appmsg_type=' + a.appmsg_type + '&mid=' + a.mid + '&sn=' + a.sn + '&idx=' + a.idx + '&scene=' + a.scene + '&title=' + encodeURIComponent(a.title) + '&ct=' + a.ct + '&devicetype=' + a.devicetype + '&version=&f=json&r=0.41129520173508016&is_need_ad=1&comment_id=' + a.comment_id + '&is_need_reward=1&both_ad=1&reward_uin_count=54&uin=' + a.uin + '&key=' + a.key + '&pass_ticket=' + a.pass_ticket + '&wxtoken=' + a.wxtoken + '&devicetype=' + a.devicetype + '&clientversion=11020201&x5=1';

  var exthr = createXmlHttpRequest();
  exthr.open('POST', appmsgextUrl, false);
  exthr.setRequestHeader('Content-Type', 'application/json');
  var param = 'is_only_read=1';
  //exthr.send(param);


  var ext = JSON.parse(exthr.response);


  a.appmsg_ext = ext;

  console.log('ext');
  console.log(ext);


  if (ext && ext.appmsgstat) {
    a.readCount = Math.max(ext.appmsgstat.read_num, ext.appmsgstat.real_read_num);
    a.likeCount = ext.appmsgstat.like_num;
    document.getElementById('info').innerHTML = '已获取阅读/点赞数据，请在简直数据助手「我的数据」中查看';
  } else {
    a.readCount = -1;
    a.likeCount = -1;

    document.getElementById('info').innerHTML = '注意：目前无法获取阅读和点赞数据，可能是因为请求过于频繁，也可能因为目前的微信客户端版本不正确或没有通过微信客户端点击打开链接。<br>目前确定兼容的微信版本有：Windows 1.x / Mac 2.2.7 或以下 / QQ 浏览器自带微信插件';
    }

  // 处理打赏信息
  if (ext.can_reward === 1) {
    a.rewardCount = ext.reward_total_count;
  } else {
    a.rewardCount = 0;
  }

  var appmsgcommentUrl = 'https://mp.weixin.qq.com/mp/appmsg_comment?action=getcomment&__biz=' + a.biz + '&appmsgid=' + a.mid + '&idx=' + a.idx + '&comment_id=' + a.comment_id + '&offset=0&limit=500' + '&uin=' + a.uin + '&key=' + a.key + '&pass_ticket=' + a.pass_ticket + '&wxtoken=' + a.wxtoken + '&devicetype=' + a.devicetype.replace(/&/g, '%26amp%3B') + '&clientversion=11020201&x5=0 HTTP/1.1';
  var commenthr = createXmlHttpRequest();
  commenthr.open('POST', appmsgcommentUrl, false);
  commenthr.setRequestHeader('Content-Type', 'application/json');
  //commenthr.send();

  var comment = JSON.parse(commenthr.response);

  a.appmsg_comment = comment;

  //console.log(typeof(comment));
  if (typeof(comment.elected_comment_total_cnt) !== 'undefined') {
    a.commentCount = comment.elected_comment_total_cnt;
  }


  // 记录原始页面信息（不能记录，否则内容太长无法发送）
  //a.oriHTML = document.getElementById('js_content').innerHTML.toString(); // 原始网页内容
  //a.oriHTML = document.body.innerHTML.toString(); // 原始网页内容

  //render(a);


  console.log('Get article object done');
  //console.log(a);

  // 提交到后台处理
  chrome.runtime.sendMessage({ 'msgtype': 'wechat.article', 'content': a }, function (response) {
    console.log(response);
  });

});

/******************************************************************************
 * 渲染文章数据到当前页面
 *****************************************************************************/
function render(a) {
  //console.log('rendering');
  var box = document.createElement('div');

  document.getElementById('post-user').onclick = function(){
    location.href = baseUrl + '/account?biz=' + a.biz;
  }


  document.getElementById('js_article').style = ('margin-right:400px;');
  box.innerHTML =
      '<div id="data">' +
        '<div style="padding: 20px 0;"><div style="margin-bottom: 10px; color: #4C6381; font-weight: bold; font-size: 14px;">更多数据</div>' +
        '<div id="data-primary">' +
        '  <div class="metric read-box"><span id="readLabel">阅读数量</span><span id="read">' + a.readCount + '</span></div>' +
        '  <div class="metric like-box"><span id="likeLabel">点赞数量</span><span id="like">' + a.likeCount + '</span></div>' +
        '  <div class="metric comment-box"><span id="commentLabel">评论数量</span><span id="comment">' + a.commentCount + '</span></div>' +
        '  <div class="metric reward-box"><span id="rewardLabel">打赏数量</span><span id="reward">' + a.rewardCount + '</span></div>' +
        '</div>' +
        '<div id="data-secondary">' +
        '  <div class="metric"><span id="imageLabel">图片数量</span><span id="image">' + a.imageCount + '</span></div>' +
        '  <div class="metric"><span id="voiceLabel">语音数量</span><span id="voice">' + a.voiceCount + '</span></div>' +
        '  <div class="metric"><span id="musicLabel">音乐数量</span><span id="music">' + a.musicCount + '</span></div>' +
        '  <div class="metric"><span id="videoLabel">视频数量</span><span id="video">' + a.videoCount + '</span></div>' +
        '  <div class="metric"><span id="voteLabel">投票数量</span><span id="vote">' + a.voteCount + '</span></div>' +
        '  <div class="metric"><span id="copyrightLabel">原创声明</span><span id="copyright">' + a.copyrightStat + '</span></div>' +
        '</div>' +
      '</div>';
  document.getElementById('sidebar').appendChild(box);
}

function renderErr(a) {

  document.getElementById('post-user').onclick = function(){
    location.href = baseUrl + '/account?biz=' + a.biz;
  }

  document.getElementById('js_article').style = ('margin-right:400px;');
  var box = document.createElement('div');
  box.id = 'error';

  box.innerHTML =
    '<div style=" padding-top: 10px;"><div style="margin-bottom: 10px; color: #ff0000; font-weight: bold; font-size: 14px;">还差一点点...</div>' +
        '<p>还差一步，您就可以在这个页面上直接看到文章的阅读数、点赞数、评论数、打赏数，以及评论内容、打赏内容等详细数据了。</p><p>我们检测到您成功安装了插件，但没有通过低版本微信客户端点击文章链接打开文章页面，简直数据助手需要和低版本微信客户端结合使用，请<a href="https://share.weiyun.com/a48b91ca03004b0e40c73b965eb83791">下载微信 1.0 版本</a>（Mac 的话也建议使用 1.0 版本）</p>' +
      '</div>';
      document.getElementById('sidebar').appendChild(box);
}

function renderBasic(a) {
  var box = document.createElement('div');
  box.id = 'basic';
  box.innerHTML =
        '<div style="margin-top: 10px; padding: 20px 0;"><div style="margin-bottom: 10px; color: #4C6381; font-weight: bold; font-size: 14px;">前往简直数据平台查看</div> <a class="btn" href="' + baseUrl + '/account?biz=' + a.biz + '" target="_blank">公众号数据</a><br> <a class="btn" target="_blank" href="' + baseUrl + '/article/detail?uid=' + a.uid + '">文章数据</a></div>' +
        '<div style="padding: 20px 0;"><div style="margin-bottom: 10px; color: #4C6381; font-weight: bold; font-size: 14px;">基本数据</div>' +
'公众号BIZ：' + a.biz +
'<br>文章标识：' + a.uid +
        '</div>' +
      '</div>';
  document.getElementById('sidebar').appendChild(box);
}

/******************************************************************************
 * 从当前页面内容中提取变量
 *****************************************************************************/
function getWxVar(index) {
  var content = document.body.innerHTML;
  var re = new RegExp('var ' + index + ' = [\"\'](.+)[\"\']');
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

