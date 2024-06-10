import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const excludeWarnings = [
    'css-unused-selector',
    'vite-plugin-svelte-preprocess-depends-on-self'
];

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://kit.svelte.dev/docs/integrations#preprocessors
    // for more information about preprocessors
    preprocess: [
        vitePreprocess(),
        sveltePreprocess({
            postcss: { configFilePath: join(__dirname, 'postcss.config.cjs') }
        })
    ],
    onwarn: (warning, handler) => {
        if (excludeWarnings.includes(warning.code)) {
            return;
        }
        handler(warning);
    },
    kit: {
        adapter: adapter({
            pages: 'dist',
            assets: 'dist',
            fallback: undefined,
            precompress: false,
            strict: true
        })
    }
};

export default config;
