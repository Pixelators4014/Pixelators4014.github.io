const rootDir = __dirname + '/../../';

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [`${rootDir}/layouts/**/*.html`, `${rootDir}/content/**/*.md`, `${rootDir}/themes/**/*.html`],
    darkMode: 'selector',
    plugins: [
        require('@tailwindcss/forms'),
    ],
    theme: {
        fontFamily: {
            sans: ['Inter', 'sans-serif'],
        },
    }
}
