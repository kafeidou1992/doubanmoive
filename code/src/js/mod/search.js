import $ from '../lib/jquery-2.0.3.min.js'
import lazyload from './lazyload'
require('../../less/index.less')

export default class search{
    constructor(){
        this.$ele = $('#search')
        this.start = 0
        this.count = 20
        this.isloading = false
        this.isfinally = false
        this.bind()
    }

    init(){
        this.start = 0
        this.isfinally = false 
    }

    bind(){
        let self = this
        this.$ele.find('.search .btn').click(function(){
            self.$ele.find('.container').html('')
            self.init()
            self.getData(val=>{
                self.render(val)
                self.$ele.trigger('scroll.lazy') //触发图片懒加载，否则初始展现的图片不显示
            })   
        })
        this.$ele.scroll(function(){
            if(self.isBottom()&&!self.isfinally&&!self.isloading){
                self.getData(val=>{
                    self.render(val)
                })
            }
        })
    }

    isBottom(){
        return (this.$ele.find('.wrap').height() - 10 <= this.$ele.height() + this.$ele.scrollTop())
    }

    getData(callback){
        if(this.isloading) return
        this.isloading = true
        this.$ele.find('.loading').fadeIn()
        $.ajax({
            url: 'https://api.douban.com/v2/movie/search',
            method: 'GET',
            data: {
                start: this.start,
                count: this.count,
                q: this.$ele.find('input').val()
            },
            dataType: 'jsonp'
        }).done(res=>{
            console.log(res)
            this.total = res.total
            this.start += this.count
            this.isloading = false
            this.$ele.find('.loading').hide()
            if(this.start>= this.total){
               this.isfinally = true
            }
            callback(res)
        }).fail(err=>{
            console.log(err)
            this.isloading = false
            this.$ele.find('.loading').hide()
        })
    }

    render(data){
        let node = `<div class="item">
                        <a href="#">
                            <img src="" alt="">
                            <div class="detail">
                                <h3 class="title">肖申克的救赎</h3>
                                <div><span class="score">9.3分</span>/ <span class="col">1000</span>收藏</div>
                                <div><span class="year">1994</span>/ <span class="type">犯罪、剧情</span></div>
                                <div class="director">导演：<span>张艺谋</span></div>
                                <div class="actor">主演：<span>张艺谋、张艺谋</span></div>
                            </div>
                        </a>
                    </div>`
        data.subjects.forEach(val=>{
            this.$node = $(node)
            this.$node.find('a').attr('href',val.alt)
            this.$node.find('img').attr({
                "data-src": val.images.medium,
                "class": "lazyload"
            })
            this.$node.find('.title').text(val.title)
            this.$node.find('.score').text(val.rating.average+'分')
            this.$node.find('.col').text(val.collect_count)
            this.$node.find('.year').text(val.year)
            this.$node.find('.type').text(val.genres.join('、'))
            this.$node.find('.director span').text(val.directors.map(val=>val.name).join('、'))
            this.$node.find('.actor span').text(val.casts.map(val=>val.name).join('、'))
            this.$ele.find('.container').append(this.$node)
        })
        new lazyload(this.$ele)
    }


}