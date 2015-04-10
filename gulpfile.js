// Loads the gulp library.
var gulp = require("gulp");

// Loads in all of the gulp tasks in the ./gulp directory.
require("require-dir")("./gulp");

// Sets the default gulp task to call the "dev" task. This is what gets called
// when typing `gulp` in a development shell.
gulp.task("default", ["dev"]);
