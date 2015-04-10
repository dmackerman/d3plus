var babelify = require("babelify"),
    browserify = require("browserify"),
    connect = require("gulp-connect"),
    error = require("./error.js"),
    gulp = require("gulp"),
    notify = require("gulp-notify"),
    path = require("path"),
    source = require("vinyl-source-stream"),
    timer = require("gulp-duration"),
    watchify = require("watchify");

// Initiate the live-connect server from the root directory. This is used
// primarily to serve the .html test files in the /test/ directory.
connect.server({
  "livereload": true,
  "port": 4000,
  "root": path.resolve("./")
});

// Declares the main bundler object.
var bundler;

// Rebuilds the main "d3plus.js" file.
var rebundle = function(){

  bundler.transform(babelify).bundle()
    .on("error", notify.onError(error))  // Notifies if any error exists.
    .pipe(source("d3plus.js"))           // Defines the output filename.
    .pipe(gulp.dest("./"))               // Defines the output path.
    .pipe(timer("Build time"))           // Outputs build time to development shell.
    .pipe(notify({
      "title": "D3plus",
      "message": "New build compiled.",
      "icon": path.join(__dirname, "/../icon.png")
    }))                                  // Creates an OS notification.
    .pipe(connect.reload());             // Reloads the live-connect server.

};

// Creates the main bundler object.
bundler = watchify(browserify(watchify.args)) // Initializes watchify
  .add("./src/init.js")                       // Defines the static root file for building.
  .on("update", rebundle);                    // When any required file is changed, rebundle the build.

// Created the main "dev" gulp task that initiates a rebundle and watches the
// test directory for .html updates.
var testDir = "./test/**/*.*";
gulp.task("dev", function(){

  // Initiates a new development bundle of the library.
  rebundle();

  // Reloads the live-connect server when any HTML file in the /test/ directory
  // has changed.
  gulp.watch([testDir], function(){

    gulp.src(testDir).pipe(connect.reload());

  });

});
