/**
 * maelstrom-css | test/main.js
 */
'use strict';

const Assert     = require('assert');
const CssPlugin = require('../lib/index.js');
const Path       = require('path');

// // // // // // // // // // // // // // // // // // // // // // // // // // //

function getFixtureFile($file)
{
    return Path.resolve(__dirname, './fixtures/' + $file);
}

// -----------------------------------------------------------------------------
