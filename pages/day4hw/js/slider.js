/**
 * Created by johnny's on 2016/11/1.
 */
(function(){

    /*淡入淡出效果*/
    function fade (obj) {
        var slideContainer = document.getElementById('slideContainer');
        var slidePage = slideContainer.getElementsByClassName('slide-page');
        var slideIndicator = document.getElementById('slideIndicator');
        slideIndicator.style.display = 'none';
        slideContainer.style.position = 'relative';
        slideContainer.style.height = window.getComputedStyle(slidePage[0]).height;
        for(var i=0;i<slidePage.length;i++) {
            slidePage[i].style.position = 'absolute';
        }
        var j = 0;
        setInterval(function() {
            for(i=0;i<slidePage.length;i++) {
                slidePage[i].style.opacity = 0;
                slidePage[i].style.transition = 'all 1s';
            }
            slidePage[j].style.opacity = 1;
            j++;
            if(j>=slidePage.length) {
                j=0;
            }
        },1000*obj.speed);
    }

    /*平移效果*/
    function slide(obj) {
        // 容器
        var slideContainer = document.getElementById('slideContainer');
        // 用于滚动的div
        var slideWrapper = document.createElement('div');
        var slideIndicator = document.getElementById('slideIndicator');
        // 指示器
        var indicators = slideIndicator.getElementsByClassName('indicator');

        //内层滑动div DOM 样式操作
        slideWrapper.innerHTML = slideContainer.innerHTML;
        //最外层overflow hidden div
        slideContainer.innerHTML = '';
        slideContainer.style.overflow = 'hidden';
        slideContainer.appendChild(slideWrapper);
        slideContainer.style.position = 'relative';
        slideWrapper.style.position = 'absolute';
        var slidePage = slideContainer.getElementsByClassName('slide-page');
        slideWrapper.appendChild(slidePage[0].cloneNode(true));
        for(var i=0;i<slidePage.length;i++) {
            slidePage[i].style.float = 'left';
        }

        var width = parseInt(window.getComputedStyle(slidePage[0]).width);
        var height = parseInt(window.getComputedStyle(slidePage[0]).height);

        slideWrapper.style.width = parseInt(width)*parseInt(slidePage.length) +'px';
        slideWrapper.style.height = height +'px';
        slideWrapper.style.left = 0;

        slideContainer.style.width = width +'px';
        slideContainer.style.height = height +'px';


        // 移动函数
        function move(offset,num,speed) {
            offset += speed;
            if(num>0) {
                slideWrapper.style.left = parseInt(slideWrapper.style.left) - speed +'px';
            }else {
                slideWrapper.style.left = parseInt(slideWrapper.style.left) + speed +'px';

            }
            var a = setTimeout(function(){
                move(offset,num,speed);
            },10);
            if(offset>=width*Math.abs(num)) {
                clearTimeout(a);
            }
            return a;
        }

        // 主要动画
        function animate() {
            console.log('animate index'+index);
            for(var i=0;i<indicators.length;i++) {
                indicators[i].className = 'indicator';
            }
            if(index == slidePage.length-1) {
                slideWrapper.style.left = 0;
                index =0;
            }
            console.log(arguments[0]);
            move(0,arguments[0] || 1,5);

            index ++;
            if(index<slidePage.length-1){
                indicators[index].className += ' on';
            }else{
                indicators[0].className += ' on';
            }

        }

        var index=0;
        var a;
        a = setInterval(animate,1000*obj.speed);
        slideContainer.onmouseover = function() {
            clearInterval(a)
        };
        slideContainer.onmouseout = function() {
            a = setInterval(animate,1000*obj.speed);
        };

        //指示器的点击事件
        for(i=0;i<indicators.length;i++) {
            indicators[i].index = i;
            indicators[i].onclick = function() {
                clearInterval(a);
                for(var i=0;i<indicators.length;i++) {
                    indicators[i].className = 'indicator';
                }
                this.className +=' on';
                //index = this.index;
                if(this.index-index != 0){
                    move(0,this.index-index,50);

                }
                index = this.index;
                setTimeout(function(){
                    a = setInterval(animate,1000*obj.speed);
                });
            }
        }


    }


    return window.slider = function slider (/*obj*/) {
        /* 参数验证*/
        var obj = arguments[0] || {};
        if(typeof obj != 'object' && obj!= undefined){
            throw 'arguments is not a object';
        }
        var defaultObj = {
            animate: 'slide',
            speed: 5
        };
        if(obj.animate ==undefined) obj.animate = defaultObj.animate;
        if(obj.speed == undefined) obj.speed = defaultObj.speed;
        console.log(obj);

        switch (obj.animate){
            case 'fade': fade(obj);break;
            case 'slide': slide(obj);break;
        }

    };
})();
