var config = {
    'wechat.article.content': {
      display_name: '微信文章',
      url_re: ['.*mp.weixin.qq.com\/[s|mp\/]+.*'],
      url_demo: 'https://mp.weixin.qq.com/s?__biz=MzIxNDY3MTEzOQ==&mid=2247487231&idx=1&pass_ticket=zzzzzzzzzzzzz%3D...',
      head: ['采集时间', '公众号', '文章标题', '图片数', '视频数', '音乐数', '语音数', '投票数', '内链数'],
      field: ['ts', 'author', 'title', 'imageCount', 'videoCount', 'musicCount', 'voiceCount', 'voteCount', 'linkCount']
    },
    'toutiao.article': {
      display_name: '今日头条文章',
      url_re: ['.*www.toutiao.com\/[a-z]+[0-9a-z]*\/'],
      url_demo: 'https://www.toutiao.com/a6564937835667784199/',
      head: ['采集时间', '头条号', '文章标题', '发布时间', '评论数'],
      field: ['ts', 'author', 'title', 'create_time', 'comment_num']
    },
    'douban.movie': {
      display_name: '豆瓣电影',
      url_re: ['.*movie.douban.com\/subject\/.*'],
      url_demo: 'https://movie.douban.com/subject/1291546/',
      head: ['采集时间', '片名', '评价人数', '豆瓣评分', '影评数', '短评数', '讨论数', '提问数'],
      field: ['ts', 'name', 'rating_people', 'score', 'commentCount', 'short_commentCount', 'discussCount', 'questionCount']
    },
    'dianping.shop': {
      display_name: '大众点评',
      url_re: ['.*www.dianping.com\/shop\/.*'],
      url_demo: 'http://www.dianping.com/shop/19428531',
      head: ['采集时间', '店名', '电话', '人均消费（元）', '口味评分', '环境评分', '服务评分'],
      field: ['ts', 'shop_name', 'tel', 'avg_price', 'taste_score', 'environment_score', 'service_score']
    },
    'lianjia.zufang': {
      display_name: '链家租房',
      url_re: ['.*lianjia.com\/zufang\/.+\.html'],
      url_demo: 'https://bj.lianjia.com/zufang/101102869280.html',
      head: ['采集时间', '房源标题', '价格', '单位', '装修', '位置'],
      field: ['ts', 'title', 'price', 'price_unit', 'decoration', 'location']
    },
    'woaiwojia.zufang': {
      display_name: '我爱我家租房',
      url_re: ['.*5i5j.com\/zufang\/.+'],
      url_demo: 'https://tj.5i5j.com/zufang/39136207.html',
      head: ['采集时间', '房源标题', '价格', '位置'],
      field: ['ts', 'title', 'price', 'location']
    },
    'jd.product.search': {
      display_name: '京东搜索',
      url_re: ['.*search.jd.com\/Search.+'],
      url_demo: 'https://search.jd.com/Search?keyword=ticwatch&enc=utf-8&wq=ticwatch',
      list: 'product_list',
      head: ['采集时间', '商品名', '价格', '评论数', '店铺', '关键词', '页码', '排名'],
      field: ['ts', 'name', 'price', 'commentCount', 'shop', 'keyword', 'page', 'rank']
    },
    'jd.product': {
      display_name: '京东商品',
      url_re: ['.*item.jd.com\/.+\.html'],
      url_demo: 'https://item.jd.com/7437800.html',
      head: ['采集时间', '商品名', '价格', '评论数'],
      field: ['ts', 'title', 'price', 'commentCount']
    },
    'jd.product.comment': {
      display_name: '京东商品评论',
      url_re: [],
      url_demo: 'https://item.jd.com/7437800.html',
      list: 'comments',
      head: ['采集时间', '商品名', '作者', '内容'],
      field: ['ts', 'referenceName', 'nickname', 'content']
    },
    'taobao.product': {
      display_name: '淘宝商品',
      url_re: ['.*item.taobao.com\/item\.htm.*'],
      url_demo: 'https://item.taobao.com/item.htm?id=567492490321',
      head: ['采集时间', '商品名', '价格', '评论数'],
      field: ['ts', 'title', 'price', 'commentCount']
    },
    'taobao.zhongchou': {
      display_name: '淘宝众筹',
      url_re: ['.*izhongchou.taobao.com\/dreamdetail.htm.*', '.*hi.taobao.com\/market\/hi\/deramdetail.php.*'],
      url_demo: 'https://izhongchou.taobao.com/dreamdetail.htm?id=20076647',
      head: ['采集时间', '店铺', '众筹标题', '认筹人数', '认筹金额', '目标金额', '完成比例(%)'],
      field: ['ts', 'nick', 'name', 'support_person', 'curr_money', 'target_money', 'finish_per']
    },
    'tmall.product': {
      display_name: '天猫商品',
      url_re: ['.*detail.tmall.com\/item\.htm.*'],
      url_demo: 'https://detail.tmall.com/item.htm?spm=a230r.1.14.1.4c30745aDl288D&id=570015250626&sku_properties=5919063:6536025',
      head: ['采集时间', '商品名', '价格', '评论数'],
      field: ['ts', 'title', 'price', 'commentCount']
    },
    'tmall.product.comment': {
      display_name: '天猫商品评论',
      url_re: [],
      url_demo: 'https://detail.tmall.com/item.htm?spm=a230r.1.14.1.4c30745aDl288D&id=570015250626&sku_properties=5919063:6536025',
      list: 'rateDetail.rateList',
      head: ['采集时间', '评论编号', '作者', '内容'],
      field: ['ts', 'id', 'displayUserNick', 'rateContent']
    },
    'amazon.user': {
      display_name: '亚马逊用户',
      url_re: ['.*www.amazon.com\/gp\/profile\/.*'],
      url_demo: 'https://www.amazon.com/gp/profile/amzn1.account.AE5APW6S4F7VJV4UV2ZDINLOHJDQ/',
      head: ['采集时间', 'customerId', 'directedId', 'Nickname', 'URL'],
      field: ['ts', 'customerId', 'directedId', 'nameHeaderData.name', 'url']
    },
    'amazon.com.product': {
      display_name: '亚马逊商品',
      url_re: ['.*www.amazon.com\/.+\/dp\/.+'],
      url_demo: 'https://www.amazon.com/toobigdata/dp/B07CN5WV3Y',
      head: ['采集时间', '商品', '评论数', '评分', '价格'],
      field: ['ts', 'title', 'review_count', 'rating', 'price']
    },
    'amazon.com.product.review': {
      display_name: '亚马逊商品评论',
      url_re: ['.*www.amazon.com\/.+\/product-reviews\/.+', '.*www.amazon.com\/product-reviews\/.+\/.+'],
      url_demo: 'https://www.amazon.com/product-reviews/B00YD547Q6/',
      list: 'review_list',
      head: ['采集时间', '标题', '作者', '评论日期', 'SKU', '评论数', '内容'],
      field: ['ts', 'title', 'author', 'date', 'sku', 'comment_num', 'text']
    },
    'amazon.sellercentral.message': {
      display_name: '亚马逊商家后台消息',
      url_re: ['.*sellercentral.*.amazon..*/messaging/inbox.*'],
      url_demo: 'https://sellercentral.amazon.com/messaging/inbox/ref=ag_cmin_wper_home?bt=&cs=1326999346&ct=&fi=ALL&nt=&pd=NEXT&pn=1',
      list: 'message_list',
      head: ['采集时间',  '作者', '作者编号', '邮箱', '订单编号'],
      field: ['ts', 'buyer_name', 'buyer_id', 'buyer_email', 'order_id']
    },
    'kickstater.project.comment': {
      display_name: 'Kickstarter 评论',
      url_re: ['.*www.kickstarter.com\/projects\/.*\/.*\/comments.*'],
      url_demo: 'https://www.kickstarter.com/projects/1739570430/you-suck-at-piano-2-you-still-suck/comments',
      list: 'comment_list',
      head: ['采集时间', '作者', '评论日期', '内容'],
      field: ['ts', 'author_name', 'comment_at', 'content']
    },
    'kickstater.user': {
      display_name: 'Kickstarter 用户',
      url_re: ['.*www.kickstarter.com\/profile\/.*\/about'],
      url_demo: 'https://www.kickstarter.com/profile/1739570430/about',
      head: ['采集时间', '名字', 'back数', '创建项目数', '评论数', '加入时间'],
      field: ['ts', 'name', 'backed_num', 'create_num', 'comment_num', 'joined_at']
    },
    'weibo.user.info': {
      display_name: '微博用户信息',
      url_re: ['.*weibo.com\/p\/.*\/info\?.*'],
      url_demo: 'https://weibo.com/p/1005051409424591/info',
      head: ['采集时间', '昵称', '关注数', '粉丝数', '微博数', '详细信息'],
      field: ['ts', 'nickname', 'follow_num', 'fan_num', 'status_num', 'info']
    },
    'weibo.user.follow': {
      display_name: '微博用户关系',
      url_re: ['.*weibo.com\/p\/.*\/follow.*'],
      url_demo: 'https://weibo.com/p/1005051409424591/follow',
      list: 'follow_list',
      head: ['采集时间', 'fromID', '关系', 'toID', '昵称', '性别', '关注数', '粉丝数', '微博数', '地址', '简介'],
      field: ['ts', 'oid', 'relation', 'uid', 'nickname', 'gender', 'follow_num', 'fan_num', 'status_num', 'address', 'intro']
    },
    'douyin.video': {
      display_name: '抖音视频',
      url_re: ['.*www.iesdouyin.com\/share\/video\/.*','.*www.douyin.com\/share\/video\/.*', '.*www.amemv.com\/share\/video\/.*'],
      url_demo: 'https://www.douyin.com/share/video/6517911823285488904/',
      //list: 'follow_list',
      head: ['采集时间', '作者',  '描述', '播放数', '点赞数', '评论数', '分享数', '视频地址'],
      field: ['ts', 'author_name',  'desc', 'play_count', 'digg_count', 'comment_count', 'share_count', 'url']
    },
    'douyin.user': {
      display_name: '抖音用户',
      url_re: ['.*www.douyin.com\/share\/user\/.*', '.*www.amemv.com\/share\/user\/.*'],
      url_demo: 'https://www.douyin.com/share/user/80812090202',
      //list: 'follow_list',
      head: ['采集时间', '作者', '抖音号', '粉丝数', '获赞数', '视频数', '喜欢数'],
      field: ['ts', 'nickname', 'short_id', 'follower_count', 'total_favorited', 'aweme_count', 'like_count' ]
    },
    'douyin.user.like': {
      display_name: '抖音用户喜欢的视频',
      url_demo: 'https://www.douyin.com/share/user/80812090202',
      list: 'aweme_list',
      head: ['采集时间', '作者',  '描述', '播放数', '点赞数', '评论数', '分享数', '视频地址', '无水印地址'],
      field: ['ts', 'author_name',  'desc', 'play_count', 'digg_count', 'comment_count', 'share_count', 'url', 'real_url']
    },
    'kuaishou.video': {
      display_name: '快手视频',
      url_re: ['.*www.kuaishou.com\/photo\/.+\/.+'],
      url_demo: 'https://www.kuaishou.com/photo/380943713/5422080811',
      //list: 'follow_list',
      head: ['采集时间', '作者', '视频ID', '视频标题', '播放数', '点赞数', '评论数'],
      field: ['ts', 'userName', 'photoId', 'caption', 'viewCount', 'likeCount', 'commentCount']
    },
    'kuaishou.user': {
      display_name: '快手用户',
      url_re: ['.*kuaishou.com\/user\/.*', '.*aomen.s.gifshow.com\/user\/.*'],
      url_demo: 'https://live.kuaishou.com/profile/3xj2r3kwmzky3d9',
      //list: 'follow_list',
      head: ['采集时间', '作者', '快手ID', '粉丝数', '关注数', '视频数'],
      field: ['ts', 'user_name', 'user_id', 'follower_count', 'following_count', 'photo_count' ]
    },
    'huoshan.video': {
      display_name: '火山小视频',
      url_re: ['.*reflow.huoshan.com\/share\/item\/.*'],
      url_demo: 'http://reflow.huoshan.com/share/item/6564635585649052941/',
      //list: 'follow_list',
      head: ['采集时间', '作者', '标题', '播放数', '点赞数', 'Ticket', '分享数', '视频地址'],
      field: ['ts', 'author_name', 'title', 'play_count', 'digg_count', 'ticket', 'share_count', 'url']
    },
}

// TOTO
// asin 解析会有问题
// 火山user https://reflow.huoshan.com/share/user/59803703333/
