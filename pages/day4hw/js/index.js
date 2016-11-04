/**
 * Created by johnny's on 2016/11/4.
 */
var arrow = document.getElementsByClassName('arrow');
var left = arrow[0];
var right = arrow[1];
var imgs = document.getElementsByClassName('lay4img');
var index = 0;

left.addEventListener('click',slideTo,true);
right.addEventListener('click',slideTo,true);
function slideTo (event) {
    var e = event || window.event;
    var target = e.target || e.srcElement;
    if(/toLeft/.test(target.className)){
        if(init()){
            index++;
            if(index>=imgs.length) index = 0;
            imgs[index].style.opacity = 1;
        }

    }else if(/toRight/.test(target.className)){
        if(init()){
            index--;
            if(index<0) index = imgs.length-1;
            imgs[index].style.opacity = 1;
        }
    }
    function init() {
        for(var i=0;i<imgs.length;i++) {
            imgs[i].style.transition='all 0.5s';
            imgs[i].style.opacity =0;
        }
        return true;
    }
}

var lay1container = document.getElementsByClassName('container')[0];
lay1container.style.transition = 'all 0.5s';
var lay1Indicator = document.querySelectorAll('.indicator >li');
for (var i=0;i<lay1Indicator.length;i++) {
    (function(i){
        lay1Indicator[i].onclick = function() {
            init();
            lay1container.style.opacity = 0;

            setTimeout(function(){
                lay1container.scrollLeft = i*1154;
                lay1container.style.opacity = 1;
            },500);

            this.style.background = '#666';
        };
        function init () {
            for(var j=0;j<lay1Indicator.length;j++) {
                lay1Indicator[j].style.transition = 'all 0.5s';
                lay1Indicator[j].style.background = 'transparent';
            }
        }
    })(i);
}

var lay3 = document.querySelectorAll('.lay3')[0];
var srcs = [
    "./images/s1.png",
    "./images/s2.png",
    "./images/s3.png",
    "./images/s4.png",
    "./images/s5.png",
    "./images/s6.png",
    "./images/s7.png",
    "./images/s8.png",
    "./images/s9.png",
    "./images/s10.png",
    "./images/s11.png",
    "./images/s12.png"
];
var rd = Math.floor(Math.random()*11);
var lay3imgs = lay3.getElementsByTagName('img');
function randomArr () {
    var arr = [0,1,2,3,4,5,6,7,8,9,10,11];
    return arr = arr.sort(function(a,b){return Math.random() - 0.5;});
}

setInterval(function (){
    var arr = randomArr();
    var temp = '';
    for(var i=0;i<arr.length;i++) {
        temp = srcs[arr[i]];
        srcs[arr[i]] = srcs[i];
        srcs[i] = temp;
    }
    for(i=0;i<lay3imgs.length;i++) {
        lay3imgs[i].src = srcs[i];
    }
},2000);