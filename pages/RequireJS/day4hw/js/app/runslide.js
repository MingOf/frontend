/**
 * Created by johnny's on 2016/11/11.
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
