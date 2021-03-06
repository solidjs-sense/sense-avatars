import { basename } from 'path';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

// @ts-ignore
const env = process.env.NODE_ENV;

export default defineConfig({
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
      generateScopedName: (name, filename) => {
        const res = `SUIS_${basename(filename).replace(/\.module\.scss(.*)$/, '')}_${name}`;
        return res;
      },
    },
  },
  plugins: [solidPlugin()],
  base: env === 'production' ? '/sense-avatars' : '/',
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
});
