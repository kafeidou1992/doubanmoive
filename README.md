# doubanmoive
### 项目简介
使用JQuery实现移动端豆瓣电影，主要包括：展示电影Top250和北美电影排行列表，实现电影搜索等功能。
### 技术细节
- 采用面向对象的编程方式实现“电影Top250”、“北美电影排行”、“电影搜索”三个模块，通过Tab切换控制模块的显示。
- 本项目为单页应用，为了模拟多页应用的体验，采用history.pushState方法为当前Tab页url添加查询参数，实现url改变时页面不刷新；通过判断当前Tab页url查询参数，确定显示哪个模块，从而实现页面刷新时仍能定位到当前Tab页，并响应浏览器的前进、后退按钮。
- 为了加快页面渲染速度，提升用户体验，采用滚动懒加载方式加载更多数据；采用图片懒加载组件控制图片加载，并应用函数节流加以优化。


