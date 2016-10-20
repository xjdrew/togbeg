var fs = require('fs-extra');
var path = require('path');

var paths = require('../config/paths');

exports.copyAssets = () => {
    if (process.env.NODE_ENV === 'production') {
        fs.copySync(path.join(paths.appPublic, "manifest.prod.json"), path.join(paths.appBuild, "manifest.json"))
    } else {
        fs.copySync(path.join(paths.appPublic, "manifest.dev.json"), path.join(paths.appBuild, "manifest.json"))
    }
    fs.copySync(paths.appPublic, paths.appBuild, {
        dereference: true,
        filter: file => {
            if (file === paths.appPopupHtml || file === paths.appOptionsHtml || file === paths.appBackgroundHtml) {
                return false;
            }
            if(/manifest\.(prod|dev)\.json/.test(file)) {
                return false;
            }
            return true;
        },
    });
}
