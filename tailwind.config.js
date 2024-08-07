/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                background: {
                    DEFAULT: '#FFCB30',
                    alt: '#F37335',
                    secondary: '#F1F1F2',
                    screen: '#F1F1F2',
                },
                primary: {
                    DEFAULT: '#353635',
                    foreground: '#e8e8e8',
                },
                secondary: {
                    DEFAULT: '#e8e8e8',
                    foreground: '#353635',
                    gray: '#707070',
                },
                destructive: {
                    DEFAULT: '#ff0000',
                    foreground: '#e8e8e8',
                },
                muted: {
                    DEFAULT: '#b8b4b4',
                    foreground: '#353635',
                },
                gradient: {
                    yellow_orange: '#F69940',
                    orange: '#F1753E',
                    yellow: '#FCC242',
                    sunglow: '#FDC830',
                },
                sos: {
                    gray: '#707070',
                    light_gray: '#707070',
                },
                disabled: '#BFBFBF',
            },
        },
    },
    plugins: [],
}
