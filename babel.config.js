module.exports = api => {
  api.cache(true);

  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            Root: './',
            Assets: './src/assets',
            Components: './src/components',
            Config: './src/config',
            Constants: './src/constants',
            Helpers: './src/helpers',
            I18N: './src/i18n',
            Navigation: './src/navigation',
            Redux: './src/redux',
          },
          extensions: ['.ios.js', '.android.js', '.js', '.json'],
        },
      ],
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          blacklist: null,
          whitelist: null,
          safe: true,
          allowUndefined: true,
        },
      ],
    ],
  };
};
