// No-op Babel plugin shim.
// react-native-worklets-core v1.x does not ship a Babel plugin (src/plugin.js is missing).
// react-native-reanimated/plugin (configured in babel.config.js) already handles
// all worklet transformation, so this stub safely satisfies the module resolution.
module.exports = function reactNativeWorkletsPlugin() {
  return { visitor: {} };
};
