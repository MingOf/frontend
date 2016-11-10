/**
 * Created by johnny's on 2016/11/4.
 */
var gulp = require('gulp');
var bs = require("browser-sync");
gulp.task("browsersync",function(){
    var files=["./bshw/**/*.html","./bshw/**/*.css","./bshw/images/*"];
    /*1.��������Դ���飬2.server�ĸ�Ŀ¼*/
    bs.init(files,{server:{baseDir:"./bshw"}});
});

gulp.task('watch',function() {
    gulp.watch([
        "./bshw/**/*.html","./bshw/**/*.css","./bshw/images/*"
    ]);
});

//gulp.task('default',['browsersync','watch']);