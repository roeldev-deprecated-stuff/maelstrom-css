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

const Maelstrom = require('maelstrom');

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
$plugin.setStream('./streams/concat.js');

/**
 * Autoprefix and further minify the result when not `--dev`.
 */
$plugin.setStream('./streams/css.js');

// -----------------------------------------------------------------------------

/**
 *
 */
$plugin.setTask('./tasks/default.js', [
                    Maelstrom.TASK_WATCH,
                    Maelstrom.TASK_COMPILE]);

/**
 * Clean the CSS output dir from all excess files.
 */
$plugin.setTask('clean', [Maelstrom.TASK_CLEAN], function()
{
    Maelstrom.stream('clean', $plugin.dest());
});

// -----------------------------------------------------------------------------

module.exports = $plugin;
