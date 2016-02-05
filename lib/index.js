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
 */
'use strict';

module.exports = function()
{
    const self = this; // maelstrom object

    this.plugin('css',
    {
        'file':  __filename,

        /**
         * Return the location of the Sass source files.
         */
        src: function($src)
        {
            let $defaultSrc = self.config.src.css + '/**/*.css';
            return self.utils.extendArgs($src, $defaultSrc);
        },

        /**
         * Return the location of the CSS output folder.
         */
        dest: function()
        {
            return self.config.dest.css;
        }
    });
};
