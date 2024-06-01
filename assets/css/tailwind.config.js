const rootDir = __dirname + '/../../';

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [`${rootDir}/layouts/**/*.html`, `${rootDir}/content/**/*.md`, `${rootDir}/themes/**/*.html`],
    darkMode: 'selector',
    plugins: [],
    theme: {
        colors: {
            'ctheme': {
                'light': '#ffffff',
                DEFAULT: '#ffffff',
                'dark': '#1d1e20',
            },
            'centry': {
                'light': '#ffffff',
                DEFAULT: '#ffffff',
                'dark': '#2e2e33',
            },
            'cprimary': {

            },
            'csecondary': {

            },
            'ctertiary': {

            },
            'ccontent': {
                'light': '#1f1f1f',
                DEFAULT: '#1f1f1f',
                'dark': '#c4c4c5',
            },

        }
    }
}
