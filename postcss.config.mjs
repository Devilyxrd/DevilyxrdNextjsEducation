/**
 * postcss.config.mjs — Tailwind v4 tek pluginle çalışır.
 * Tailwind 3'teki `tailwindcss` + `autoprefixer` ikilisinin yerine
 * tek `@tailwindcss/postcss` yeterli.
 */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
