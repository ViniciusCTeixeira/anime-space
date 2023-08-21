module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
      preview: {
        plugins: ['react-native-paper/babel'],
      },
    },
  };
};
