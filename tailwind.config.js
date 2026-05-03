/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        marquee: "marquee 28s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        bookhive: {
          primary: "#c2410c",
          secondary: "#7c3aed",
          accent: "#0d9488",
          neutral: "#292524",
          "base-100": "#fafaf9",
          "base-200": "#f5f5f4",
          "base-300": "#e7e5e4",
          info: "#0369a1",
          success: "#15803d",
          warning: "#ca8a04",
          error: "#b91c1c",
        },
      },
      "dark",
    ],
  },
};
