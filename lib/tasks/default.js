/**
 * maelstrom-css | lib/tasks/default.js
 */
'use strict';

const _ = require('lodash');

// // // // // // // // // // // // // // // // // // // // // // // // // // //

module.exports = function($plugin, $maelstrom)
{
    return function()
    {
        let $concat = $maelstrom.config.css.concat;

        if (!_.isEmpty($concat))
        {
            for (let $destFile in $concat)
            {
                if (!$concat.hasOwnProperty($destFile))
                {
                    continue;
                }

                let $srcFiles = $concat[$destFile];

                $maelstrom.gulp.src($srcFiles)
                    .pipe( $maelstrom.stream('plumber') )
                    .pipe( $plugin.stream('concat', [$destFile]) )
                    .pipe( $maelstrom.stream('size') )
                    .pipe( $maelstrom.gulp.dest($plugin.dest()) );
            }
        }
    };
};
