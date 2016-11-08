/**
 * Created by johnny's on 2016/11/8.
 */
(function(){
    var imgs = $('img.box');
    var currentIndex = 0;

    /*灯箱*/
    function LightBox () {
    }
    /*图片控制*/
    function ImgController () {
    }
    /*获取图片的原始宽度和高度*/
    function getNaturalSize (DomElement) {
        console.log('+++++++++++++++getting NaturalSize++++++++');
        var originWidth = DomElement.attr('owidth');
        var originHeight = DomElement.attr('oheight');
        var natureSize = {};

        // 如果获取到了owidth 和oheight 属性, 则使用owidth,oheight 作为图片原始宽高
        if(originWidth!=undefined && originHeight!=undefined) {
            natureSize.width = originWidth;
            natureSize.height= originHeight;
            return natureSize;
        }
        if(window.naturalWidth && window.naturalHeight) {
            natureSize.width = DomElement.naturalWidth;
            natureSize.height = DomElement.naturalHeight;
        } else {
            var img = new Image();
            img.src = DomElement.attr('src');
            console.log(DomElement.attr('src'));
            natureSize.width = img.width;
            natureSize.height = img.height;
        }
        console.log(natureSize);
        return natureSize;
    }

    ImgController.prototype = {
        constructor: ImgController,
        height: 'auto',
        clickHandler: function (index) {
            /*点击图片后 初始化轮播容器和遮罩层*/
            var lightbox = new LightBox();
            lightbox.createSlider(index);
            lightbox.createCover();
            lightbox.createPrev(index);
            lightbox.createNext(index);
            lightbox.createBtn();
            return lightbox;
        },
        scale: function () {
            $('img.box').click(function(){
                $(this).animate({
                    width: "600px",
                    height: "400px"
                });
            });
        }
    };

    LightBox.prototype = {
        constructor: LightBox,

        /*创建遮罩*/
        createCover: function () {
            var cover = $('<div></div>');
            $('#lightBox').append($(cover));
            $(cover).addClass('coverlay');
            //$(cover).click(function(){
            //    $(this).hide();
            //    /*删除创建的遮罩层和slide*/
            //    $('#lightBox .slide').remove();
            //    $(this).remove();
            //});
            return $(cover);
        },

        /*创建滑动(轮播)图片容器*/
        createSlider: function (index) {
            //console.log(currentIndex);

            var slide = $('<div></div>');
            //var originWidth = imgs.eq(index).attr('owidth') || getNaturalSize(imgs.eq(index)).width;
            //var originHeight = imgs.eq(index).attr('oheight') || getNaturalSize(imgs.eq(index)).height;
            var naturalSize = getNaturalSize(imgs.eq(index));
            $(slide).animate({
                width: naturalSize.width,
                height: naturalSize.height
            });

            // 向灯箱中添加图片
            $(slide).append('<img src='+imgs.eq(index).attr("src")+'>');
            $('#lightBox').append(slide);
            slide.addClass('slide');
            return $(slide);
        },

        /*创建左按钮*/
        createPrev: function (index) {
            var prev = $('<div></div>');
            $(prev).addClass('prev');
            $('.slide').append(prev);

            $(prev).click(function(){
                /*按钮点击时判断是否另一个按钮应该隐藏*/
                if(currentIndex<=1){
                    $(this).hide();
                }else{
                    $('.next').show();
                }
                /*判断是否是第一个图片,如果是,则当前index变为最后一张图片*/
                if(currentIndex<=0){
                    currentIndex = imgs.length;
                }
                currentIndex --;
                //console.log(currentIndex);
                $('#lightBox .slide img').attr('src',imgs.eq(currentIndex).attr("src"));
                var naturalSize = getNaturalSize(imgs.eq(currentIndex));
                $('.slide').css('opacity',0);
                $(".slide").animate({
                    width: naturalSize.width,
                    height: naturalSize.height,
                    opacity:1
                });
                index--;

            });
            if(currentIndex == 0) {
                $(prev).hide();
                return prev;
            }
            return prev;
        },

        /*创建右按钮*/
        createNext: function (index) {

            var next = $('<div></div>');
            $(next).addClass('next');
            $('.slide').append(next);

            $(next).click(function(){
                /*按钮点击时判断是否另一个按钮应该隐藏*/
                if(currentIndex>=imgs.length-2){
                    $(this).hide();
                }else{
                    $('.prev').show();
                }
                if(currentIndex>=imgs.length-1){
                    currentIndex = -1;
                }

                $('#lightBox .slide img').attr('src',imgs.eq(currentIndex+1).attr("src"));
                index++;
                currentIndex ++;
                var naturalSize = getNaturalSize(imgs.eq(currentIndex));
                $('.slide').css('opacity',0);
                $(".slide").animate({
                    width: naturalSize.width,
                    height: naturalSize.height,
                    opacity:1
                });
                //console.log(currentIndex);
            });
            if(currentIndex == imgs.length-1) {
                $(next).hide();
                return;
            }
            return next;
        },

        createBtn: function () {
            var closeBtn = $('<div class="btn">＋</div>');
            $('.slide').append(closeBtn);
            $(closeBtn).click(function(){
                $(this).parent().remove();
                $('.coverlay').remove();
            });
        }
    };

    var imgCtrl = new ImgController();
    $.lightBox = function () {

        imgs.each(function(i){
            //i表示node(图片) 的索引,点击的是第几个
            $(this).click(function(){
                currentIndex = i;
                //console.log(currentIndex);
                // 图片索引,点击的是第几个?
                imgCtrl.clickHandler(i);
            });
        });
    };
    return $;
})();