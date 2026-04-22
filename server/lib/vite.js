import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function viteAssets() {
    // CORRECCIÓN: isDev es true si NO estamos en producción
    const isDev = process.env.NODE_ENV !== 'production';
    const viteDevServer = process.env.VITE_DEV_SERVER || 'http://localhost:5173';

    if (isDev) {
        return `
        <script type="module" src="${viteDevServer}/@vite/client"></script>
        <script type="module" src="${viteDevServer}/main.js"></script>
        `;
    }

    // MODO PRODUCCIÓN (Fuera del bloque if anterior)
    // CORRECCIÓN: Usar __dirname (con doble guion bajo)
    const manifestPath = path.join(__dirname, '..', '..', 'dist', '.vite', 'manifest.json');

    if (!fs.existsSync(manifestPath)) {
        console.warn('Vite manifest not found. Run "npm run build" first');
        return '';
    }

    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    const mainEntry = manifest['main.js'];

    if (!mainEntry) {
        console.warn('main.js entry not found in Vite manifest');
        return '';
    }

    let tags = '';

    // Archivos CSS
    if (mainEntry.css) {
        // CORRECCIÓN: Es .forEach, no .array.forEach
        mainEntry.css.forEach(cssFile => {
            tags += `<link rel="stylesheet" href="/${cssFile}">`;
        });
    }

    // Archivo JS
    tags += `<script type="module" src="/${mainEntry.file}"></script>`;
    return tags;
}

export function registerViteHelper(hbs) {
    hbs.registerHelper('viteAssets', () => {
        // CORRECCIÓN: Quitar el "new" si no es necesario o asegurar el retorno
        return new hbs.SafeString(viteAssets());
    });
}