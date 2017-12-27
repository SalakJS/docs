const gulp = require('gulp')
const ghPages = require('gulp-gh-pages')

//Deploy
gulp.task('deploy', function() {
  return gulp.src('./_book/**/*')
    .pipe(ghPages())
})
