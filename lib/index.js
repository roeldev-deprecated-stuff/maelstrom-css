/**
 * maelstrom-css | lib/index.js
 *
 * Streams:
 * ✓ css (autoprefix + minify)
 * ✓ concat
 * - lint
 *
 * Tasks:
 * ✓ css
 * - css:lint
 * - css:clean
 */
'use strict';

const _                = require('underscore');
const GulpAutoprefixer = require('gulp-autoprefixer');
const GulpConcat       = require('gulp-concat');
const GulpCssNano      = require('gulp-cssnano');
const GulpIf           = require('gulp-if');

// // // // // // // // // // // // // // // // // // // // // // // // // // //

module.exports = function()
{
    const Maelstrom = this;
    const Config    = Maelstrom.config;
    const Gulp      = Maelstrom.gulp;
    const Utils     = Maelstrom.utils;

    // -------------------------------------------------------------------------

    let $plugin = new Maelstrom.Plugin(__filename, 'css',
    {
        /**
         * Return the location of the Sass source files.
         */
        src: function($src)
        {
            let $defaultSrc = Config.src.css + '/**/*.css';
            return Utils.extendArgs($src, $defaultSrc);
        },

        /**
         * Return the location of the CSS output folder.
         */
        dest: function()
        {
            return Config.dest.css;
        }
    });

    // -------------------------------------------------------------------------

    /**
     * Concatenate CSS files, autoprefix and minify the result when not `--dev`.
     */
    $plugin.addStream('concat', function($destFile, $isProd)
    {
        // make sure the dest filename has a js file extension
        if ($destFile && $destFile.substr($destFile.length - 4) !== '.css')
        {
            $destFile += '.css';
        }

        let $stream = GulpConcat($destFile);
        $stream.pipe( $plugin.stream('css', [$isProd]) );

        return $stream;
    });

    /**
     * Autoprefix and further minify the result when not `--dev`.
     */
    $plugin.addStream('css', function($isProd)
    {
        let $stream = GulpAutoprefixer(Config.css.autoprefixer);

        // minify when in production mode
        $stream.pipe( GulpIf(Utils.isProd() || $isProd, GulpCssNano()) );

        return $stream;
    });

    // -------------------------------------------------------------------------

    /**
     *
     */
    $plugin.addTask('css', function()
    {
        let $concat = Config.css.concat;

        if (!_.isEmpty($concat))
        {
            for (let $destFile in $concat)
            {
                if (!$concat.hasOwnProperty($destFile))
                {
                    continue;
                }

                let $srcFiles = $concat[$destFile];

                Gulp.src($srcFiles)
                    .pipe( Maelstrom.stream('plumber') )
                    .pipe( self.stream('concat', [$destFile]) )
                    // .pipe( GulpSize(Config.main.size) )
                    .pipe( Maelstrom.stream('size') )
                    .pipe( Gulp.dest(self.dest()) );
            }
        }
    });

    /**
     * Clean the CSS output dir from all excess files.
     */
    $plugin.addTask('css:clean', function()
    {
        Maelstrom.stream('clean', Config.dest.css);
    });

    return $plugin;
};
