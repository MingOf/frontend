### 目录结构
```js
 demo/
    css/
    font/
    images/
    js/
        app/                /*非库*/
            index.js
            runslide.js
        lib/               /*库*/
            slider.js
        config.js          /*配置*/
        require.js
    index.html
```

### 入口
```html
/**
 * demo/index.html
 * 
 */
<!-- 使用requirejs模块化后, 可使页面只需要使用srcipt标签导入js -->
<!-- data-main属性定义了入口, 在config.js中编写requirejs的相关配置 -->
<script data-main="js/config.js" src="./js/require.js"></script>
```

### define
define 用于定义模块，通常一个模块只做一件事
```js
/**
 * demo/js/app/runslide.js
 * 
 */

/**
 * define可以直接定义键值对
 * @type {对象}
 */
define({
    key: value
})
/**
 * [第一个参数是执行回调函数所需要的依赖，如果没有依赖，可以不写第一个参数]
 * @return {一个对象}   也可以是返回function，AMD并没有严格要求用于定义模块的回调
 * 函数必须要返回对象，任何返回值都是可以的，甚至可以返回一个函数的模块定义
 * 
 */
define(['slider'],function(s){
    console.log(s);
    function runslide () {
        console.log('haha');
        s.slider({
            animate: 'fade',
            speed: 5
        });
    }
    return {
        runslide:runslide
    };
});
```

### config
```js
/**
 * demo/js/config.js
 */

/**
 * config 函数传入一个对象,该对象会对baseUrl,path以及shim等进行配置
 * @type {Object}
 */
require.config({
    baseUrl:'js/app',
    /**
     * paths 定义除baseUrl之外的详细路径, 即在确定了baseUrl为默认url之后
     * 其他的模块相对于baseUrl的相对路径
     * 如"slider": '../lib/slider', 表示slider模块位于js/lib/slider
     * @type {Object}
     */
    paths: {
        "slider": '../lib/slider',
        'index': 'index',
        'runslide':'runslide'
    },

    /**
     * shim中添加的是不符合AMD规范的模块,最明显的特点就是,
     * 此类模块通常是在开发 初期没有考虑requirejs. 
     * @type {Object}
     */
    shim: {
        //"slider": [],
        'index': []
    }
});

// require 和 define的不同点?
require(['runslide','slider','index'],function(r){
    r.runslide();
});
```



原本的slider.js 是这样写的。 函数执行完毕后，将slider 函数暴露给window，而其他代码
则隐藏在只执行函数当中。这种写法没有使用requireJS的语法，所以requireJS是不认的
```js
(function(){
   ...
   ...
   ...
    window.slider function slider (/*obj*/) {
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
})()
```


原本计划将slider.js(自行封装的轮播) 放入lib中当做库使用，然而slider.js在写的时候并没有使用AMD规范。
而runslide.js 放入app中，runslide 是后来自己写的，遵循规范。于是矛盾出现了：
我遵循AMD规范的代码，要使用“野生”的slider.js作为作为依赖，直接使用肯定是不行的
```js
/**
 * demo/js/app/runslide.js
 */

/**
 * 定义一个runslide的模块，该模块依赖于slider模块
 * return 一个对象
 */
define(['slider'],function(s){
    console.log(s);
    function runslide () {
        console.log('hah');
        s.slider({
            animate: 'fade',
            speed: 5
        });
    }
    return {
        runslide:runslide
    };
});

```

于是... 强行用define转换了一波
```js
/**
 * Created by johnny's on 2016/11/1.
 */
define
({
    slider:
        (function(){

            ...
            ...
            ...

            return function slider (/*obj*/) {
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
        })()
});

```

### requireJS 顺序
模块的加载顺序是不固定的，但执行顺序是固定的，按依赖声明的先后顺序执行。
>RequireJS的模块语法允许它尽快地加载多个模块，虽然加载的顺序不定，但依赖的顺序最终是正确的。同时因为无需创建全局变量，甚至可以做到在同一个页面上同时加载同一模块的不同版本。

所以我的demo的执行顺序应该是?
> data-main ==> config --> 配置baseUrl,path以及shim ==> r.runslide()