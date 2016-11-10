/**
 * Created by johnny's on 2016/11/4.
 */
var gulp = require('gulp');
var bs = require("browser-sync");
gulp.task("browsersync",function(){
    var files=["./bshw/**/*.html","./bshw/**/*.css","./bshw/images/*"];
    /*1.监听的资源数组，2.server的根目录*/
    bs.init(files,{server:{baseDir:"./bshw"}});
});

gulp.task('watch',function() {
    gulp.watch([
        "./bshw/**/*.html","./bshw/**/*.css","./bshw/images/*"
    ]);
});

//gulp.task('default',['browsersync','watch']);