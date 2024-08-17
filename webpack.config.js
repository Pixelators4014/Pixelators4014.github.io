const path = require('path');

module.exports = {
    entry: {
        // Scripts
        'main': './src/entry/main.js',
        'fastsearch': './src/entry/fastsearch.js',
        'intersect': './src/entry/intersect.js',
        'sentry': './src/entry/sentry.js',
        'turbo': './src/entry/turbo.js',
        'themeToggle': './src/entry/themeToggle.js',
        'copyCode': './src/entry/copyCode.js',
        // Pages
        'home': './src/page/home.js',
    },
    output: {
        path: path.resolve(__dirname, 'assets/js/'),
        filename: '[name].js',
    },
};
