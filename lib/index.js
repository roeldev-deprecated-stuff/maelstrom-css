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

const _                = require('lodash');
const GulpAutoprefixer = require('gulp-autoprefixer');
const GulpConcat       = require('gulp-concat');
const GulpCssNano      = require('gulp-cssnano');
const GulpIf           = require('gulp-if');
const Maelstrom        = require('maelstrom');

// // // // // // // // // // // // // // // // // // // // // // // // // // //

const $plugin = new Maelstrom.Plugin(__filename, 'css',
{
    /**
     * Return the location of the Sass source files.
     */
    src: function($src)
    {
        let $defaultSrc = Maelstrom.config.src.css + '/**/*.css';
        return Maelstrom.utils.extendArgs($src, $defaultSrc);
    },

    /**
     * Return the location of the CSS output folder.
     */
    dest: function()
    {
        return Maelstrom.config.dest.css;
    }
});

// -----------------------------------------------------------------------------

/**
 * Concatenate CSS files, autoprefix and minify the result when not `--dev`.
 */
$plugin.setStream('concat', function($destFile, $isProd)
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
$plugin.setStream('css', function($isProd)
{
    let $stream = GulpAutoprefixer(Maelstrom.config.css.autoprefixer);

    // minify when in production mode
    $stream.pipe( GulpIf(Maelstrom.utils.isProd() || $isProd, GulpCssNano()) );

    return $stream;
});

// -----------------------------------------------------------------------------

/**
 *
 */
$plugin.setTask('default',
                [Maelstrom.TASK_WATCH, Maelstrom.TASK_COMPILE],
                function()
{
    let $concat = Maelstrom.config.css.concat;

    if (!_.isEmpty($concat))
    {
        for (let $destFile in $concat)
        {
            if (!$concat.hasOwnProperty($destFile))
            {
                continue;
            }

            let $srcFiles = $concat[$destFile];

            Maelstrom.gulp.src($srcFiles)
                .pipe( Maelstrom.stream('plumber') )
                .pipe( $plugin.stream('concat', [$destFile]) )
                .pipe( Maelstrom.stream('size') )
                .pipe( Maelstrom.gulp.dest(self.dest()) );
        }
    }
});

/**
 * Clean the CSS output dir from all excess files.
 */
$plugin.setTask('clean', [Maelstrom.TASK_CLEAN], function()
{
    Maelstrom.stream('clean', $plugin.dest());
});

// -----------------------------------------------------------------------------

module.exports = $plugin;
