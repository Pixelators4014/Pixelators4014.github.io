const path = require('path');

module.exports = {
    entry: {
        'intersect': './src/intersect.js',
        'sentry': './src/sentry.js',
        'turbo': './src/turbo.js',
    },
    output: {
        path: path.resolve(__dirname, 'assets/js/'),
        filename: '[name].js',
    },
};
