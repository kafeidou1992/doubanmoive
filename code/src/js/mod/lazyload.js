import $ from '../lib/jquery-2.0.3.min.js'

export default class lazyload{
    constructor($ele){
        this.$ele = $ele
        this.bind()
    }
    bind(){
        let self = this
        this.$ele.on('scroll.lazy',this.throttle(function(){
            self.$imgs = self.$ele.find('img.lazyload')
            if(self.$imgs.length===0){
                return self.$ele.off('scroll.lazy')
            }
            self.$imgs.each(function(){
                if(self.isInviewport(this)){
                    self.loadimg(this)
                }
            })

        },300))
    }

    throttle(fn,wait){
        let pre, timer
        return function handle(){
            let cur = Date.now()
            let dif = cur - pre
            if(!pre || dif >= wait){
                fn()
                pre = cur
            }else if(dif < wait){
                clearTimeout(timer)
                timer = setTimeout(handle, wait-dif)
            }
        }
    }

    isInviewport(img){
        let {top,bottom} = img.getBoundingClientRect()
        let vHeight = this.$ele.height()
        return (top>0 && top< vHeight)||(bottom>0 && bottom< vHeight)
    }

    loadimg(img){
       img.src = $(img).attr('data-src')
       $(img).removeClass('lazyload')
    }

}