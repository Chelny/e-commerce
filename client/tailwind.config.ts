import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // darkMode: "class",
  theme: {
    extend: {
      gridTemplateRows: {
        "app": "max-content auto max-content",
        "app-footer-links": "repeat(3, max-content)",
        "app-footer-links-md": "1fr",
      },
      gridTemplateColumns: {
        "app-header": "1fr 1fr",
        "app-header-md": "1fr 2fr 1fr",
        "app-footer-links": "1fr",
        "app-footer-links-md": "repeat(2, max-content) auto",
        "app-footer-copyright": "repeat(2, 1fr)",
      },
      width: {
        "authentication-form": "100%",
        "authentication-form-md": "32rem",
      },
      borderRadius: {
        "default": "0.25rem",
      },
      colors: {
        "ecommerce": {
          100: "#f8f9fa",
          200: "#e9ecef",
          300: "#dee2e6",
          400: "#ced4da",
          500: "#899097",
          600: "#495057",
          700: "#343a40",
          800: "#212529",
          900: "#131618",
        },
      },
    },
  },
  plugins: [],
}
export default config
