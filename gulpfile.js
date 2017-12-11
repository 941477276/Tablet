var gulp = require("gulp");  
var babel = require("gulp-babel");  
var browserSync = require("browser-sync").create();
  
gulp.task("jsToES5", function () {  
    return gulp.src("other.js")// ES6 源码存放的路径  
        .pipe(babel({  
            presets: ['es2015']  
        }))  
        .pipe(gulp.dest("dist")); //转换成 ES5 存放的路径 
}); 
/*开启静态服务器*/
gulp.task("browser", function (){
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});