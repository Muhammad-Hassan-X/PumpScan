const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// 🔹 SVG Transformer
config.transformer.babelTransformerPath =
  require.resolve("react-native-svg-transformer");

// 🔹 Fix asset/source extensions
config.resolver.assetExts = config.resolver.assetExts.filter(
  (ext) => ext !== "svg"
);
config.resolver.sourceExts.push("svg");

// 🔹 Wrap with NativeWind
module.exports = withNativeWind(config, {
  input: "./app/global.css",
});
