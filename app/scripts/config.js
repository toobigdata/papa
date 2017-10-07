var config = {
    'wechat.article': {
      display_name: '微信文章数据',
      url_re: ['.*mp.weixin.qq.com\/[s|mp\/]+.*pass_ticket.*'],
      head: ['时间', '公众号', '文章标题', '阅读数', '点赞数', '评论数', '打赏数'],
      field: ['ts', 'author', 'title', 'readCount', 'likeCount', 'commentCount', 'rewardCount'],
      detail_selector: 'appmsg_comment.elected_comment',
      detail_head: ['作者', '评论', '点赞数'],
      detail_field: ['nick_name', 'content', 'like_num'],
    },
    'taobao.zhongchou': {
      display_name: '淘宝众筹数据',
      url_re: ['.*izhongchou.taobao.com\/dreamdetail.htm.*', '.*hi.taobao.com\/market\/hi\/deramdetail.php.*'],
      head: ['时间', '店铺', '众筹标题', '认筹人数', '认筹金额', '目标金额', '完成比例(%)'],
      field: ['ts', 'nick', 'name', 'support_person', 'curr_money', 'target_money', 'finish_per']
    },
    'toutiao.article': {
      display_name: '今日头条文章数据',
      url_re: ['.*www.toutiao.com\/[a-z]+[0-9a-z]*\/'],
      head: ['时间', '头条号', '文章标题', '发布时间', '评论数'],
      field: ['ts', 'author', 'title', 'create_time', 'comment_num']
    },
    'douban.movie': {
      display_name: '豆瓣电影数据',
      url_re: ['.*movie.douban.com\/subject\/.*'],
      head: ['时间', '片名', '评价人数', '豆瓣评分', '影评数', '短评数', '讨论数', '提问数'],
      field: ['ts', 'name', 'rating_people', 'score', 'commentCount', 'short_commentCount', 'discussCount', 'questionCount']
    },
    'dianping.shop': {
      display_name: '大众点评数据',
      url_re: ['.*www.dianping.com\/shop\/.*'],
      head: ['时间', '店名', '电话', '人均消费', '口味评分', '环境评分', '服务评分'],
      field: ['ts', 'shop_name', 'tel', 'avg_price', 'taste_score', 'environment_score', 'service_score']
    },
    'lianjia.zufang': {
      display_name: '链家租房数据',
      url_re: ['.*lianjia.com\/zufang\/.+'],
      head: ['时间', '房源标题', '价格', '单位', '装修', '位置'],
      field: ['ts', 'title', 'price', 'price_unit', 'decoration', 'location']
    },
    'woaiwojia.zufang': {
      display_name: '我爱我家租房数据',
      url_re: ['.*5i5j.com\/rent\/.+'],
      head: ['时间', '房源标题', '价格', '位置'],
      field: ['ts', 'title', 'price', 'location']
    },
    'jd.product': {
      display_name: '京东商品',
      url_re: ['.*item.jd.com\/.+\.html'],
      head: ['时间', '房源标题', '价格', '位置'],
      field: ['ts', 'title', 'price', 'location']
    }
}
