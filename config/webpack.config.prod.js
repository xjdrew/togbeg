var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var paths = require('./paths');

// This is the production configuration.
// It compiles slowly and is focused on producing a fast and minimal bundle.
// The development configuration is different and lives in a separate file.
module.exports = {
    // Don't attempt to continue if there are any errors.
    bail: true,
    // We generate sourcemaps in production. This is slow but gives good results.
    // You can exclude the *.map files from the build during deployment.
    devtool: 'source-map',
    // In production, we only want to load the polyfills and the app code.
    entry: {
        "popup": [require.resolve('./polyfills'), paths.appPopupJs],
        "options": [require.resolve('./polyfills'), paths.appOptionsJs],
        "background": [require.resolve('./polyfills'), paths.appBackgroundJs],
    },
    output: {
        // The build folder.
        path: paths.appBuild,
        // Generated JS file names (with nested folders).
        // There will be one main bundle, and one file per asynchronous chunk.
        // We don't currently advertise code splitting but Webpack supports it.
        filename: 'js/[name].[chunkhash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
        // We inferred the "public path" (such as / or /my-project) from homepage.
        publicPath: "/"
    },
    module: {
        // First, run the linter.
        // It's important to do this before Babel processes the JS.
        preLoaders: [{
            test: /\.(js|jsx)$/,
            loader: 'eslint',
            include: paths.appSrc
        }],
        loaders: [
            // Process JS with Babel.
            {
                test: /\.(js|jsx)$/,
                include: paths.appSrc,
                loader: 'babel',

            },
            // The notation here is somewhat confusing.
            // "postcss" loader applies autoprefixer to our CSS.
            // "css" loader resolves paths in CSS and adds assets as dependencies.
            // "style" loader normally turns CSS into JS modules injecting <style>,
            // but unlike in development configuration, we do something different.
            // `ExtractTextPlugin` first applies the "postcss" and "css" loaders
            // (second argument), then grabs the result CSS and puts it into a
            // separate file in our build process. This way we actually ship
            // a single CSS file in production instead of JS code injecting <style>
            // tags. If you use code splitting, however, any async bundles will still
            // use the "style" loader inside the async code so CSS from them won't be
            // in the main CSS file.
            {
                test: /\.css$/,
                // "?-autoprefixer" disables autoprefixer in css-loader itself:
                // https://github.com/webpack/css-loader/issues/281
                // We already have it thanks to postcss. We only pass this flag in
                // production because "css" loader only enables autoprefixer-powered
                // removal of unnecessary prefixes when Uglify plugin is enabled.
                // Webpack 1.x uses Uglify plugin as a signal to minify *all* the assets
                // including CSS. This is confusing and will be removed in Webpack 2:
                // https://github.com/webpack/webpack/issues/283
                loader: ExtractTextPlugin.extract('style', 'css?-autoprefixer!postcss')
                    // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
            },
            // JSON is not enabled by default in Webpack but both Node and Browserify
            // allow it implicitly so we also enable it.
            {
                test: /\.json$/,
                loader: 'json'
            },
            // "file" loader makes sure those assets end up in the `build` folder.
            // When you `import` an asset, you get its filename.
            {
                test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                loader: 'file',
                query: {
                    name: 'img/[name].[hash:8].[ext]'
                }
            }
        ]
    },

    // We use PostCSS for autoprefixing only.
    postcss: function() {
        return [
            autoprefixer({
                browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                ]
            }),
        ];
    },

    plugins: [
        // This helps ensure the builds are consistent if source hasn't changed:
        new webpack.optimize.OccurrenceOrderPlugin(),
        // Generates `popup.html`
        new HtmlWebpackPlugin({
            inject: false,
            filename: 'popup.html',
            template: paths.appPopupHtml,
        }),
        // Generates `options.html`
        new HtmlWebpackPlugin({
            inject: false,
            filename: 'options.html',
            template: paths.appOptionsHtml,
        }),
        // Generates `background.html`
        new HtmlWebpackPlugin({
            inject: false,
            filename: 'background.html',
            template: paths.appBackgroundHtml,
        }),
        // Try to dedupe duplicated modules, if any:
        new webpack.optimize.DedupePlugin(),
        // Minify the code.
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true, // React doesn't support IE8
                warnings: false
            },
            mangle: {
                screw_ie8: true
            },
            output: {
                comments: false,
                screw_ie8: true
            }
        }),
        // Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
        new ExtractTextPlugin('css/[name].[contenthash:8].css')
    ],
    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};
