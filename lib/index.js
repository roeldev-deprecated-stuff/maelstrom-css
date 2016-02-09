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

// // // // // // // // // // // // // // // // // // // // // // // // // // //

module.exports = function()
{
    let $plugin = new this.Plugin(__filename, 'css',
    {
        /**
         * Return the location of the Sass source files.
         */
        src: function($src)
        {
            let $defaultSrc = this.maelstrom.config.src.css + '/**/*.css';
            return this.maelstrom.utils.extendArgs($src, $defaultSrc);
        },

        /**
         * Return the location of the CSS output folder.
         */
        dest: function()
        {
            return this.maelstrom.config.dest.css;
        }
    });

    $plugin.readStreams();
    $plugin.readTasks();

    return $plugin;
};
