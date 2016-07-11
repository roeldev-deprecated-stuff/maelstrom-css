/**
 * maelstrom-css | lib/streams/concat.js
 */
'use strict';

const GulpConcat = require('gulp-concat');

// // // // // // // // // // // // // // // // // // // // // // // // // // //

module.exports = function($destFile, $isProd)
{
    // make sure the dest filename has a js file extension
    if ($destFile && $destFile.substr($destFile.length - 4) !== '.css')
    {
        $destFile += '.css';
    }

    let $stream = GulpConcat($destFile);
    $stream.pipe( $plugin.stream('css', [$isProd]) );

    return $stream;
};
