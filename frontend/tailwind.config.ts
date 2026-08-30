import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#050508",
        card: "#0c0c14",
        "card-glass": "rgba(12, 12, 20, 0.6)",
        "border-subtle": "#1a1a2e",
        "accent-blue": "#3b82f6",
        "accent-green": "#10b981",
        "accent-amber": "#f59e0b",
        "accent-purple": "#a855f7",
        "accent-pink": "#ec4899",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        shimmer: "shimmer 1.5s infinite linear",
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideInUp 0.5s ease-out",
        "slide-left": "slideInLeft 0.6s ease-out",
        "slide-right": "slideInRight 0.6s ease-out",
        "pulse-dot": "pulseDot 1s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
        "float-slow": "floatSlow 6s ease-in-out infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "border-glow": "borderGlow 3s ease-in-out infinite",
        "shimmer-holo": "shimmerHolo 3s linear infinite",
        "gradient-shift": "gradientShift 4s ease-in-out infinite",
        "scale-in": "scaleIn 0.4s ease-out",
        "neon-pulse": "neonPulse 2s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInUp: {
          "0%": { opacity: "0", transform: "translateY(40px) scale(0.95)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-60px) rotate(-2deg)" },
          "100%": { opacity: "1", transform: "translateX(0) rotate(0deg)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(60px) rotate(2deg)" },
          "100%": { opacity: "1", transform: "translateX(0) rotate(0deg)" },
        },
        pulseDot: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.4)", opacity: "0.7" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-8px) rotate(1deg)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 15px rgba(59,130,246,0.1), 0 0 30px rgba(59,130,246,0.05)" },
          "50%": { boxShadow: "0 0 25px rgba(59,130,246,0.2), 0 0 50px rgba(59,130,246,0.1)" },
        },
        borderGlow: {
          "0%, 100%": { borderColor: "rgba(59,130,246,0.2)" },
          "50%": { borderColor: "rgba(59,130,246,0.5)" },
        },
        shimmerHolo: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        gradientShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        neonPulse: {
          "0%, 100%": { boxShadow: "0 0 5px #3b82f6, 0 0 10px #3b82f6", opacity: "1" },
          "50%": { boxShadow: "0 0 15px #3b82f6, 0 0 30px #3b82f6", opacity: "0.8" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
