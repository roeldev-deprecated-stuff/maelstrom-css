/**
 * maelstrom-css | lib/streams/css.js
 */
'use strict';

const GulpAutoprefixer = require('gulp-autoprefixer');
const GulpCssNano      = require('gulp-cssnano');
const GulpIf           = require('gulp-if');

// // // // // // // // // // // // // // // // // // // // // // // // // // //

module.exports = function($isProd)
{
    let $stream = GulpAutoprefixer(this.maelstrom.config.css.autoprefixer);

    // minify when in production mode
    $stream.pipe( GulpIf((this.maelstrom.utils.isProd() || $isProd),
                         GulpCssNano()) );

    return $stream;
};
