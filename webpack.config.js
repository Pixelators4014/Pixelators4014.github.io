const path = require('path');

module.exports = {
    entry: {
        'turbo': './src/turbo.js',
        'intersect': './src/intersect.js',
    },
    output: {
        path: path.resolve(__dirname, 'assets/js/'),
        filename: '[name].js',
    },
};
