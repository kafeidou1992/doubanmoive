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
            self.seturl($(this).find('span:nth-child(2)').attr('class'))
            $(this).addClass('active').siblings().removeClass('active')
            $('main section').eq($(this).index()).fadeIn().siblings().hide()
            $('main section').eq($(this).index()).trigger('scroll')
        })

        window.onpopstate = function(){
            self.layout()
        }
    }
    layout(){
        let query = location.search.replace(/^\?/,'').split('=')
        if(query[0]==='tab'){
            this.$active = $('footer li').has('.'+query[1])
            this.$active.addClass('active').siblings().removeClass('active')
            $('main section').eq(this.$active.index()).fadeIn().siblings().hide()
            $('main section').eq(this.$active.index()).trigger('scroll')
        }else{
            $('footer li').eq(0).addClass('active').siblings().removeClass('active')
            $('main section').eq(0).fadeIn().siblings().hide()
            $('main section').eq(0).trigger('scroll')
        }
    }
    seturl(target){
        let url = location.pathname + '?tab=' +  target
		history.pushState({url: url, title: document.title}, document.title, url)
    }
}
new app()