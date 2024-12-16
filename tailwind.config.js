/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundPosition: {
                left: "left",
            },
            backgroundSize: {
                "300%": "300%",
            },
        },
    },
    plugins: [],
};
