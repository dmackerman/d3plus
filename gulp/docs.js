var gulp = require("gulp"),
    chmod = require("gulp-chmod"),
    exit = require("gulp-exit"),
    project = require("../package.json"),
    rimraf = require("gulp-rimraf"),
    yuidoc = require("gulp-yuidoc");

gulp.task("docs", function(){

  gulp.src("./docs/files/*.*", {"read": false})
    .pipe(rimraf())

  gulp.src("./src/**/*.js")
    .pipe(yuidoc({
      "project": project,
      "syntaxtype": "js"
    }))
    .pipe(chmod(644))
    .pipe(gulp.dest("./docs"))
    .pipe(exit());

})
