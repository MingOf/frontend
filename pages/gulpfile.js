/**
 * Created by johnny's on 2016/11/4.
 */
var gulp = require('gulp');
var bs = require("browser-sync");
gulp.task("browsersync",function(){
    var files=["./day4hw/**/*.html","./day4hw/**/*.css","./day4w/images/*"];
    /*1.��������Դ���飬2.server�ĸ�Ŀ¼*/
    bs.init(files,{server:{baseDir:"./day4hw"}});
});

gulp.task('watch',function() {
    gulp.watch([
        "./day4hw/**/*.html","./day4hw/**/*.css","./day4w/images/*"
    ]);
});

//gulp.task('default',['browsersync','watch']);