var path = require('path');
var fs = require('fs');

var appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
    return path.resolve(appDirectory, relativePath);
}

// 预配置各种文件路径
module.exports = {
    appBuild: resolveApp('build'),
    appPublic: resolveApp('chrome'),
    appPopupHtml: resolveApp('chrome/popup.html'),
    appOptionsHtml: resolveApp('chrome/options.html'),
    appBackgroundHtml: resolveApp('chrome/background.html'),
    appPopupJs: resolveApp('src/popup.js'),
    appOptionsJs: resolveApp('src/popup.js'),
    appBackgroundJs: resolveApp('src/background.js'),
    appSrc: resolveApp('src'),
};
