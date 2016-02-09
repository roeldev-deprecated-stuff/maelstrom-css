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
    const $maelstrom = this.maelstrom;

    /**
     * Autoprefix and further minify the result when not `--dev`.
     */
    this.addStream('css', function($isProd)
    {
        let $stream = GulpAutoprefixer($maelstrom.config.css.autoprefixer);

        // minify when in production mode
        $stream.pipe( GulpIf($maelstrom.utils.isProd() || $isProd,
                             GulpCssNano()) );

        return $stream;
    });
};
