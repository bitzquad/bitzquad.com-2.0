module.exports = {
    important: true,
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    100: "#f5f5f5",
                    200: "#ebebeb",
                    300: "#dcdcdc",
                    400: "#cccccc",
                    500: "#b3b3b3",
                },
                main: {
                    900: "#151550",
                },
                purple: {
                    custom: "#B798FF",
                },
            },
            screens: {
                "3xl": "1780px",
            },
        },
        plugins: [require("@tailwindcss/forms")],
    },
};
