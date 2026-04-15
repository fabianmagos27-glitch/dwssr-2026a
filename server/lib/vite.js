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
const isDev = process.env.NODE_ENV === 'production'    
const viteDevServer = process.env.VITE_DEV_SERVER || 'http://localhost:5173'
if(isDev){
// En desarrollo, cargamos el codigo para el front-end
// directamente del servidor de Vite
// /@vite/client da acceso a un servidor HMR (Hot Module Replacemnt)
// /main.js Front-end scripts entry point.
return `
        <script type="module" src="${viteDevServer}/@vite/client"></script>
        <script type="module" src="${viteDevServer}/main.js"></script>
        `;

    
    //EN modo produccion 
    //leyendo el manifiesto
    const manifestPath = path.join(_dirname,'..','..','dist','.vite', 'manifest.json')

    //Verificando si el manifiesto existe
    if(!fs.existsSync(manifestPath))
       console.warn('Vite manifest not found. Run "npm run build" first') 
    return '';
    }

    //parseando el manifest
    const manifest = JSON.parse(
        fs.readFileSync(manifestPath,'utf-8')
    );

    //Obtener el punto de entrada de los scripts del front-end
    const mainEntry = manifest['main.js']

    //Veridicando la correcta carga del mainEntry
    if(!mainEntry){
        console.warn('main.js entry not found in Vite manifest');
        return '';
    }


    //creando la variable que contendra la 
    //etiqueta de los scripts del front-end
    let tags = '';

    //Css files
    if(mainEntry.css){
    mainEntry.css.array.forEach(cssFile => {
      tags += `<script type="stylesheet" src="/${cssFile}"></script>`
    });
    }

    //JS Files
    tags += `<script type="module" src="/${mainEntry.file}"></script>`
    return tags;
}
       //registrando el Helper agrega funcionalidad a las plantillas de handlebars
    export function registerViteHelper(hbs){
        hbs.registerHelper(
            'viteAssets',
            () => { new hbs.SafeString(viteAssets())
        })
    }