/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "media",
  corePlugins: {
    // Bootstrap est toujours chargé globalement (auth, dialogs...) ; on
    // désactive le reset Tailwind pour ne pas casser ces écrans non migrés.
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#007BFF",
          strong: "#0056B3",
          soft: "#E7F1FF",
        },
        ink: "#212529",
        "ink-dim": "#495057",
        "ink-faint": "#868E96",
        paper: "#F8F9FA",
        surface: "#FFFFFF",
        "surface-2": "#F1F3F5",
        line: "#DEE2E6",
        danger: "#DC3545",
        secondary: "#6C757D",
        success: "#28A745",
        // Contreparties sombres des tokens ci-dessus, pour les variantes dark:
        night: {
          bg: "#16181A",
          surface: "#1E2124",
          "surface-2": "#202428",
          text: "#E9ECEF",
          "text-dim": "#ADB5BD",
          line: "#343A40",
          accent: "#4DA3FF",
          "accent-strong": "#82C0FF",
        },
      },
      fontFamily: {
        display: ['"Iowan Old Style"', '"Palatino Linotype"', "Palatino", "Georgia", "serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
    },
  },
  plugins: [],
};
