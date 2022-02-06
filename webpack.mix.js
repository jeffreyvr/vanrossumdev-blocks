let mix = require('laravel-mix');

mix.
    js('/resources/blocks/background-image/block.js', '/js/blocks.js')
    .react();