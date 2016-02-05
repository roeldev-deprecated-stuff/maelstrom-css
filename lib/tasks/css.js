/**
 * maelstrom-css | lib/tasks/css.js
 */
'use strict';

const _ = require('underscore');

// // // // // // // // // // // // // // // // // // // // // // // // // // //

module.exports = function()
{
    const self      = this; // plugin object
    const Maelstrom = this.maelstrom;
    const Config    = Maelstrom.config;
    const Gulp      = Maelstrom.gulp;

    /**
     *
     */
    this.addTask('css', function()
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
};
