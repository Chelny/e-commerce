import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      gridTemplateRows: {
        "app": "max-content auto max-content",
        "app-footer-links": "repeat(3, max-content)",
        "app-footer-links-md": "1fr",
      },
      gridTemplateColumns: {
        "app-footer-links": "1fr",
        "app-footer-links-md": "repeat(2, max-content) auto",
        "app-footer-copyright": "repeat(2, 1fr)",
      },
      width: {
        "authentication-form": "100%",
        "authentication-form-md": "32rem",
        "account-form": "100%",
        "account-form-md": "48rem",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
      },
      boxShadow: {
        "card": "inset 0 0 0.5px 1px hsl(0 0% 100% / 7.5%), 0 0 0 1px hsl(0 0% 0% / 5%), 0 0.3px 0.4px hsl(0 0% 0 % / 2%), 0 0.9px 1.5px hsl(0 0% 0% / 4.5%), 0 3.5px 6px hsl(0 0% 0 % / 9%)",
      },
      colors: {
        ecommerce: {
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
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      transitionProperty: {
        "toast": "bottom, opacity",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config