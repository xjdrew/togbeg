var path = require('path');
var fs = require('fs');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
var appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

// config after eject: we're in ./config/
module.exports = {
  appBuild: process.env.NODE_ENV === 'production' ? resolveApp('build') : resolveApp('dev'),
  appPublic: resolveApp('chrome'),
  appPopupHtml: resolveApp('chrome/popup.html'),
  appOptionsHtml: resolveApp('chrome/options.html'),
  appBackgroundHtml: resolveApp('chrome/background.html'),
  appPopupJs: resolveApp('src/popup.js'),
  appOptionsJs: resolveApp('src/popup.js'),
  appBackgroundJs: resolveApp('src/background.js'),
  appSrc: resolveApp('src'),
};
