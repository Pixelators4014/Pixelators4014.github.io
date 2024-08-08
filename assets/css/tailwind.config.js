const rootDir = __dirname + '/../../';

const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [`${rootDir}/layouts/**/*.html`, `${rootDir}/content/**/*.md`, `${rootDir}/themes/**/*.html`],
    darkMode: 'selector',
    plugins: [
        require('@tailwindcss/forms'),
        require('tailwindcss-animated'),
        require('tailwindcss-intersect')
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                logo: ['Monocraft']
            },
            colors: {
                'accent-primary': {
                    light: colors.red["600"],
                    dark: colors.red["500"],
                },
                'accent-secondary': {
                    light: colors.red["700"],
                    dark: colors.red["600"],
                },
                'text-primary': {
                    light: colors.gray["900"],
                    dark: colors.white,
                },
                'text-secondary': {
                    light: colors.slate["600"],
                    dark: colors.slate["300"],
                },
                'text-tertiary': {
                    light: colors.slate["400"],
                    dark: colors.slate["500"],
                },
                'background-0': {
                    light: colors.white,
                    dark: colors.slate["900"],
                },
                'background-1': {
                    light: colors.white,
                    dark: colors.slate["800"],
                },
                'background-2': {
                    light: colors.gray["100"],
                    dark: colors.slate["700"],
                },
                'border-01': {
                    light: colors.slate["200"],
                    dark: colors.gray["700"],
                }
            },
        }
    }
}
