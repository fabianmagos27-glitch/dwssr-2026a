import fs  from 'node:fs'
import path from 'node:path'
import{fileURLToPath} from 'node:url'

const__filename= fileURLToPath(import.meta.url);
const_dirname = path.dirname(_filename)

/**
 * helper para handlebars que genera las etiquetas
 * de vite
 * En desarrollo: Conecta añ servidor de vite
 * En produccion:usa los archivos compilados
 * del manifest
 */
export function viteAssets(){
    const isDev = process.env.VITE_DEV_SERVER || 'http://localhost:5173'
}