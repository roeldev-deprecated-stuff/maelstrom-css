/**
 * maelstrom-css | lib/streams/concat.js
 */
'use strict';

const GulpConcat = require('gulp-concat');

// // // // // // // // // // // // // // // // // // // // // // // // // // //

module.exports = function()
{
    const self = this; // plugin object

    /**
     * Concatenate CSS files, autoprefix and minify the result when not `--dev`.
     */
    this.addStream('concat', function($destFile, $isProd)
    {
        // make sure the dest filename has a js file extension
        if ($destFile.substr($destFile.length - 4) !== '.css')
        {
            $destFile += '.css';
        }

        let $stream = GulpConcat($destFile);
        $stream.pipe( self.stream('css', [$isProd]) );

        return $stream;
    });
};
