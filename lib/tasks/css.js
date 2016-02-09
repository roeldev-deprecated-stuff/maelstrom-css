/**
 * maelstrom-css | lib/tasks/css.js
 */
'use strict';

const _ = require('underscore');

// // // // // // // // // // // // // // // // // // // // // // // // // // //

module.exports = function()
{
    const self       = this; // plugin object
    const $maelstrom = this.maelstrom;

    /**
     *
     */
    this.addTask('css', function()
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
                    .pipe( self.stream('concat', [$destFile]) )
                    // .pipe( GulpSize($maelstrom.config.main.size) )
                    .pipe( $maelstrom.stream('size') )
                    .pipe( $maelstrom.gulp.dest(self.dest()) );
            }
        }
    });
};
