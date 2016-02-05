/**
 * maelstrom-css | lib/streams/css.js
 */
'use strict';

const GulpAutoprefixer = require('gulp-autoprefixer');
const GulpCssNano      = require('gulp-cssnano');
const GulpIf           = require('gulp-if');

// // // // // // // // // // // // // // // // // // // // // // // // // // //

module.exports = function()
{
    const Maelstrom = this.maelstrom;
    const Config    = Maelstrom.config;
    const Utils     = Maelstrom.utils;

    /**
     * Autoprefix and further minify the result when not `--dev`.
     */
    this.addStream('css', function($isProd)
    {
        let $stream = GulpAutoprefixer(Config.css.autoprefixer);

        // minify when in production mode
        $stream.pipe( GulpIf(Utils.isProd() || $isProd, GulpCssNano()) );

        return $stream;
    });
};
