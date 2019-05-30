const gulp = require('gulp');
const sass = require('gulp-sass');
const browser = require('browser-sync');
const typescript = require('gulp-typescript');

// gulp v4から書き方が変わっている。
// その点に注意する事。

// 参考資料
// https://teratail.com/questions/168814

//SassとCssの保存先を指定
const scss = (done) => {
    gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./docs/css/'));

    done();   // 作業終了を意味する。
};

// browser-sync
const sync = (done) => {
    browser({
        port: 8081,
        server: {
            baseDir: './docs/',
            index: 'index.html'
        },
        reloadOnRestart: true
    })

    done();
};

const tscript = (done) => {
    const options = {
        out : 'source.js'
    }

    gulp.src([
        './src/ts/**/*.ts'
    ])
        .pipe(typescript(options))
        .pipe(gulp.dest('./docs/js'));
    
    done();
};

// watcher
const watchFiles = (done) => {
    const reload = (done) => {
        browser.reload();
        done();
    };

    gulp.watch('./src/scss/**/*.scss').on('change', gulp.series(scss, reload))
    gulp.watch('./docs/**').on('change', gulp.series(reload));
    gulp.watch('./src/ts/**/*.ts').on('change', gulp.series(tscript));

    done();
};

// default
gulp.task('default', 
    gulp.series(
        gulp.parallel(sync, watchFiles)
    )
);

