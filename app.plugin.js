const { createRunOncePlugin, AndroidConfig } = require('@expo/config-plugins');
const pkg = require('./package.json');

const withNitroWallpaper = (config) => {
  return AndroidConfig.Permissions.withPermissions(config, [
    'android.permission.SET_WALLPAPER',
  ]);
};

module.exports = createRunOncePlugin(withNitroWallpaper, pkg.name, pkg.version);
