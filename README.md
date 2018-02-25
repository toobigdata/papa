# TooBigData 

这是一只数据产品经理自用两年的工具，现在推荐给你。

TooBigData 是一个帮助用户采集数据的 Chrome 插件，可在 Chrome 及 Chrome 内核的浏览器中使用，如 QQ 浏览器、360 浏览器、搜狗浏览器等。

## 安装

- [通过 Chrome 商店安装](https://chrome.google.com/webstore/detail/toobigdata/iadbllfinbilapjhgjibpeifljdgeopn)
- 通过加载 app 目录安装

## 演示

数据网站

http://app.toobigdata.com/

使用视频

https://www.youtube.com/watch?v=NCUJCnFZrAw

https://www.youtube.com/watch?v=7LY7CDP4k34

## 主要功能

- 可以在网页上显示微信文章的阅读点赞评论打赏数据
- 微信文章分钟监测及文章回采
- 查看收藏夹数据，分层级显示
- 内置通用的URL打开器，可辅助自动爬数
- 自动关闭已爬页面
- 插件免费开源，无限扩展


## 支持数据源

- 微信文章数据
- 淘宝众筹数据
- 今日头条文章数据
- 豆瓣电影数据
- 大众点评数据
- 链家租房数据
- 我爱我家租房数据
- 京东商品
- 京东商品评论
- 淘宝商品
- 天猫商品
- 天猫商品评论
- 亚马逊商品
- 亚马逊商品评论
- Kickstarter 评论
- Kickstarter 用户
- 微博用户信息
- 微博用户关注
- 抖音小视频
- 火山小视频


## 自定义

要添加更多的数据源，可通过以下方式完成

1. 修改 app/scripts/config.js，添加数据源定义
2. 在 app/scripts/track/ 目录下，添加对应的采集脚本

如果想自定义接收数据的网关，可修改 `app/scripts/background.js` 中的 `data\_upload\_url` 变量
