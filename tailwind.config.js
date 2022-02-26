module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,css}"],
  darkMode: "media",
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h1: { color: theme("colors.gray.500") },
            h2: { color: theme("colors.gray.600") },
            h3: { color: theme("colors.gray.600") },
            h4: { color: theme("colors.gray.600") },
            h5: { color: theme("colors.gray.600") },
            h6: { color: theme("colors.gray.600") },
            a: { color: theme("colors.blue.800") },
            blockquote: {
              fontFamily: theme("fontFamily.serif"),
              fontSize: theme("fontSize.lg"),
              color: theme("colors.gray.700"),
            },
            code: {
              backgroundColor: theme("colors.gray.100"),
              borderRadius: theme("borderRadius.md"),
              color: theme("colors.red.900"),
              padding: theme("spacing.1"),
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.gray.200"),
            h1: { color: theme("colors.gray.300") },
            h2: { color: theme("colors.gray.400") },
            h3: { color: theme("colors.gray.400") },
            h4: { color: theme("colors.gray.400") },
            h5: { color: theme("colors.gray.400") },
            h6: { color: theme("colors.gray.400") },
            strong: { color: theme("colors.gray.300") },
            a: { color: theme("colors.blue.300") },
            blockquote: {
              color: theme("colors.gray.300"),
            },
            code: {
              backgroundColor: theme("colors.gray.800"),
              color: theme("colors.yellow.400"),
            },
            th: { color: theme("colors.gray.400") },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      typography: ["dark"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
