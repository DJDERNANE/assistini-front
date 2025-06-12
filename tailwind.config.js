/**
 * @format
 * @type {import('tailwindcss').Config}
 */

module.exports = {
    content: ["./src/**/*.{html,js,jsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    100: "#3981F7",
                    200: "#137ad8",
                },
                secondary: {
                    100: "#1FD286",
                },
                third: {
                    100: "#FBF7ED",
                },
                bg: { 100: "#F5F6FA" },
                blue: {
                    100: "#F5F9FF",
                    200: "#EBF3FF",
                    300: "#E0EDFF",
                    400: "#D6E7FF",
                    500: "#D8D6F5",
                },
            },
        },
    },
    plugins: [],
};
