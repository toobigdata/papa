# EasyCrawler 

EasyCrawler 是一个用于爬取数据的 Chrome 插件，可用于获取微信文章、今日头条、豆瓣电影等数据。

## Demo

有 3 种安装方式：

- [通过 Chrome Web Store 安装](https://chrome.google.com/webstore/detail/%E7%AE%80%E7%9B%B4%E6%95%B0%E6%8D%AE%E5%8A%A9%E6%89%8B/iadbllfinbilapjhgjibpeifljdgeopn?hl=en-US&gl=US)
- 通过 crx 安装（[下载](https://pan.baidu.com/s/1nuU7pxR)）
- 通过加载 app 目录安装


## 微信变量说明

| 变量           | 含义         | 类型   | 取值范围    | 非法值 |
|----------------|--------------|--------|-------------|--------|
| readCount      | 阅读数       | int    | [0,+∞)      | -1     |
| likeCount      | 点赞数       | int    | [0,+∞)      | -1     |
| commentCount   | 评论数       | int    | [0,+∞)      | -1     |
| rewardCount    | 打赏数       | int    | [0,+∞)      | 无     |
| imageCount     | 图片数       | int    | [0,+∞)      | 无     |
| voiceCount     | 语音数       | int    | [0,+∞)      | 无     |
| musicCount     | 音乐数       | int    | [0,+∞)      | 无     |
| videoCount     | 视频数       | int    | [0,3]       | 无     |
| voteCount      | 投票数       | int    | [0,1]       | 无     |
| _copyrightStat | 包含原创标识 | string | 1,0         | 无     |
| biz            | 公众号id     | string |             |        |
| mid            | 消息id       | string |             |        |
| idx            | 消息id       | string | '1' to '8'  |        |
| uin            | 文章uuid     | string | biz.mid.idx |        |
| sn             | 未知         | string |             |        |
| url            | 文章url      | string |             |        |
| title          | 标题         | stinrg |             |        |
| author         | 公众号名称   | stinrg |             |        |
| digest         | 摘要         | stinrg |             |        |
| cover          | 头图url      | stinrg | url         |        |
| oriUrl         | 原文链接     | stinrg | url         |        |
| ct             | 发布时间     | stinrg | unix 时间戳 |        |
| uin            | 用户id       | string |             |        |
| key            | 用户key      | string |             |        |
