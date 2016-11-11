/**
 * Created by johnny's on 2016/11/11.
 */
require.config({
    baseUrl:'js/app',

    paths: {
        "slider": '../lib/slider',
        'index': 'index',
        'runslide':'runslide'
    },
    shim: {
        //"slider": [],
        'index': []
    }
});

require(['runslide','slider','index'],function(r){
    r.runslide();
});