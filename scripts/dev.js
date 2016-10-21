process.env.NODE_ENV = 'development'

// Do this as the first thing so that any code reading it knows the right env.
var chalk = require('chalk');
var webpack = require('webpack');

var config = require('../config/webpack.config.dev');
var tasks = require('./tasks');

function build() {
    console.log('Creating an development build...');
    webpack(config).run((err, stats) => {
        if (err) {
            console.error('Failed to create a production build. Reason:');
            console.error(err.message || err);
            process.exit(1);
        }

        console.log(chalk.green('Compiled successfully.'));
        console.log();
    });
}

build();
tasks.copyAssets();
