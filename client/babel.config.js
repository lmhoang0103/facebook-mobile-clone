module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['module:metro-react-native-babel-preset'],
        plugins: [
            'react-native-reanimated/plugin',
            [
                'module:react-native-dotenv',
                {
                    envName: 'APP_ENV',
                    moduleName: '@env',
                    path: '.env',
                    safe: false,
                    allowUndefined: true,
                    verbose: false,
                },
            ],
            [
                'module-resolver',
                {
                    root: ['.'],
                    extensions: [
                        '.ios.js',
                        '.android.js',
                        '.js',
                        '.ts',
                        '.tsx',
                        '.json',
                    ],
                    alias: {
                        '@': '.',
                        screens: './screens',
                        components: './components',
                        '@constants': './constants',
                        utilities: './utilities',
                        assets: './assets',
                        navigation: './navigation',
                        plugins: './plugins',
                        '@/*': './*',
                    },
                },
            ],
        ],
    };
};
