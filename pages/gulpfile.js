/**
 * Created by johnny's on 2016/11/4.
 */
var gulp = require('gulp');
var bs = require("browser-sync");
gulp.task("browsersync",function(){
    var files=["./day4hw/**/*.html","./day4hw/**/*.css","./day4w/images/*"];
    /*1.监听的资源数组，2.server的根目录*/
    bs.init(files,{server:{baseDir:"./day4hw"}});
});

gulp.task('watch',function() {
    gulp.watch([
        "./day4hw/**/*.html","./day4hw/**/*.css","./day4w/images/*"
    ]);
});

//gulp.task('default',['browsersync','watch']);