const rootDir = __dirname + '/../../';

module.exports = {
    plugins: [
        require('postcss-import')({
            path: [rootDir]
        }),
        require('tailwindcss')(rootDir + 'assets/css/tailwind.config.js'),
        require('autoprefixer')({
            path: [rootDir]
        }),
    ]
}
