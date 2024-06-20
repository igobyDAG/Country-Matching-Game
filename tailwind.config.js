/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                default: "#94a3b8",
                selected: "#0000FF",
                matched: "#00FF00",
                error: "#FF0000",
            },
        },
    },
    plugins: [],
};
