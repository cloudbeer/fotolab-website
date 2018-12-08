/**
 * create by chuchur
 * date 2016年12月5日12:57:40
 */
const gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    path = require('path'),
    sequence = require('gulp-sequence'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    proxy = require('http-proxy-middleware'),
    less = require('gulp-less'),
    cleancss = require('gulp-clean-css'),
    debug = require('gulp-debug'),
    zip = require('gulp-zip'),
    clean = require('gulp-clean'),
    changed = require('gulp-changed'),
    cache = require('gulp-cached'),
    gulpif = require('gulp-if'),
    opn = require('opn'),
    plumber = require('gulp-plumber'),
    gutil = require('gulp-util'),
    // var rename = require('gulp-rename'),
    nunjucksRender = require('gulp-nunjucks-api'),

    errorHandler = (e) => {
        gutil.beep();
        gutil.log(e);
    },
    env = gulp.env._[0] == 'publish' ? 'prod' : gulp.env._[0] || 'dev',

    conf = require('./config/gulp.' + env + '.conf.js'),
    dev = conf.dev,
    publish = conf.publish,
    server = conf.server,
    webConfig = conf.webConfig;
// console.log(dev.js,publish.js)
// return
// console.log(conf.dev)
//js压缩和发布
gulp.task('js', () => {
    return gulp.src(dev.js)
        .pipe(plumber({
            errorHandler: errorHandler
        }))
        .pipe(changed(publish.js, {
            extension: '.js'
        }))
        .pipe(debug({
            title: '编译:'
        }))
        .pipe(gulpif(env != 'dev', uglify()))
        //.pipe(rename({suffix:'.min'}))
        //.pipe(concat('bundle.min.js'))
        .pipe(gulp.dest(publish.js))
});

//lcss压缩和发布
gulp.task('less', () => {
    return gulp.src(dev.less) //['res/css/style.less','res/css/common.less'])
        .pipe(plumber({
            errorHandler: errorHandler
        }))
        .pipe(less())
        // .pipe(changed(publish.less, {
        //     extension: '.less'
        // }))
        .pipe(cleancss({
            advanced: true, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            // "compatibility": 'ie7', //保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepSpecialComments: '*', //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
            keepBreaks: false, //类型：Boolean 默认：false [是否保留换行]
        }))
        //.pipe(rename({suffix:'.min'}))
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest(publish.css))
});
//图片发布
gulp.task('img', () => {
    return gulp.src(dev.img)
        .pipe(changed(publish.img))
        .pipe(debug({
            title: '编译:'
        }))
        .pipe(gulp.dest(publish.img));
});
gulp.task('face', () => {
    return gulp.src(dev.face)
        .pipe(changed(publish.face))
        .pipe(debug({
            title: '编译:'
        }))
        .pipe(gulp.dest(publish.face));
});
//字体
gulp.task('fonts', () => {
    return gulp.src(dev.fonts)
        .pipe(changed(publish.fonts))
        .pipe(debug({
            title: '编译:'
        }))
        .pipe(gulp.dest(publish.fonts));
});

//页面

gulp.task('pages', () => {
    return gulp.src(dev.pages)
        // .pipe(gulpif('layout/*.html', changed(publish.pages)))
        // .pipe(changed(publish.pages))
        .pipe(plumber({
            errorHandler: errorHandler
        }))
        .pipe(nunjucksRender({
            src: 'dev',
            data: webConfig
        }))
        // .pipe(cache('html'))

        .pipe(debug({
            title: '编译:'
        }))

        .pipe(gulp.dest(publish.pages));
});

// http 前端服务器
gulp.task('connect', () => {
    return connect.server({
        root: server.root, //根目录
        port: server.port,
        livereload: false, //是否更改自动刷新页面
        middleware: (connect, opt) => {
            console.log('服务器成功跑起：' + server.url + ':' + server.port)

            // opn(server.url + ':' + server.port)
            return [
                proxy('/rest', {
                    target: server.proxy, // target host 
                    changeOrigin: true, // needed for virtual hosted sites 
                    // ws: true,                         // proxy websockets 
                    pathRewrite: server.pathRewrite
                    // pathRewrite: {
                    // // '^/rest' : '/',     // rewrite path 
                    // // '^/api/remove/path' : '/path'           // remove base path 
                    // },
                })
                // proxy('/other-test', {
                //     target: 'http://localhost:9000',
                //     changeOrigin: true,
                // })
            ]
        }
    });
});


gulp.task('reload', () => {
    return gulp.src('./publish/**/*')
        .pipe(connect.reload());
});

gulp.task("clean", () => {
    return gulp.src('./publish')
        .pipe(debug({
            title: '清理文件:'
        }))
        .pipe(clean());
});
gulp.task('zip', () => {
    return gulp.src('./publish/**/*')
        .pipe(debug({
            title: '开始打包文件:'
        }))
        .pipe(zip('publish.zip'))

        .pipe(gulp.dest('./'))
});
//输出日志
var watchEvent = (event) => {
    console.log('文件 ' + path.basename(event.path) + ' 发生 ' + event.type + ', 重启任务...');
};

//监听文件改变
gulp.task('watch', () => {
    gulp.watch(dev.fonts, ['fonts', 'reload']).on("change", watchEvent);
    gulp.watch(dev.less, ['less', 'reload']).on("change", watchEvent);
    gulp.watch(dev.js, ['js', 'reload']).on("change", watchEvent);
    gulp.watch(dev.img, ['img', 'reload']).on("change", watchEvent);
    gulp.watch(dev.face, ['face', 'reload']).on("change", watchEvent);
    gulp.watch(dev.pages, ['pages', 'reload']).on("change", watchEvent);

});
var devTasks = ['pages', 'js', 'less', 'face', 'img', 'fonts', 'reload', 'watch'];
var testTasks = ['pages', 'js', 'less', 'face', 'img', 'fonts', ];
var publishTasks = ['pages', 'js', 'less', 'face', 'img', 'fonts'];

gulp.task('default', sequence(devTasks, 'connect'));
gulp.task('dev', sequence(devTasks, 'connect'));
gulp.task('test', sequence('clean', publishTasks, 'zip'))
gulp.task('publish', sequence('clean', publishTasks, 'zip'))