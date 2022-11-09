// webpack.mix.js;
let mix = require('laravel-mix');
mix.js('resources/js/app.js', 'public/js')
    .postCss('resources/css/app.css', 'public/css')
    .vue()
    .version();
mix.autoload({
    jquery: ['$', 'window.jQuery']
});
