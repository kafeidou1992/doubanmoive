import $ from './lib/jquery-2.0.3.min.js'
import top250 from './mod/top250.js'
import beimei from './mod/beimei.js'
import search from './mod/search.js'

class app {
    constructor(){
        this.bind()
        new top250()
        new beimei()
        new search()
        this.layout()
    }
    bind(){
        let self = this
        $('footer li').click(function(){
            self.seturl($(this).find('span:nth-child(2)').attr('class')) //页面不刷新改变url
            $(this).addClass('active').siblings().removeClass('active')
            $('main section').eq($(this).index()).fadeIn().siblings().hide()
            $('main section').eq($(this).index()).trigger('scroll.lazy') //tab切换时，触发该tab页面的图片懒加载，否则该页面初始切换到时图片不显示。
        })

        window.onpopstate = function(){
            self.layout()
        } //响应浏览器前进、后退按钮
    }
    layout(){
        let query = location.search.replace(/^\?/,'').split('=')
        if(query[0]==='tab'){
            this.$active = $('footer li').has('.'+query[1])
            this.$active.addClass('active').siblings().removeClass('active')
            $('main section').eq(this.$active.index()).fadeIn().siblings().hide()
            $('main section').eq(this.$active.index()).trigger('scroll.lazy')// 在某个tab页面下刷新后，点击浏览器后退按钮，若top250或beimei页面为初次出现，需要触发图片懒加载，否则图片不显示。
        }else{
            $('footer li').eq(0).addClass('active').siblings().removeClass('active')
            $('main section').eq(0).fadeIn().siblings().hide()
            $('main section').eq(0).trigger('scroll.lazy') // 同上
        }
    }
    seturl(target){
        let url = location.pathname + '?tab=' +  target
		history.pushState({url: url, title: document.title}, document.title, url)
    }
}
new app()