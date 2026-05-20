import path from 'node:path'
import { fileURLToPath } from 'node:url'
// importando el motor de plantillas
import { create as createHandlebars } from 'express-handlebars';

// Importando la configuración de Vite 
import { registerViteHelper } from './vite.js';

// creando constantes de rutas
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// exportar la funcion de configuración 
export function configureHandlebars(app) {
    // configurando handlebars
    // creo una instancia del view engine
    const exphbs = createHandlebars({
        extname: '.hbs',
        defaultLayout: 'main'
    })
    
    // CORRECCIÓN: Usar 'handlebars' en minúscula para obtener la instancia global del motor
    registerViteHelper(exphbs.handlebars);   

    // integrando handlebars al server
    // 1. CORRECCIÓN: Era un punto, no una coma (app.engine)
    app.engine('hbs', exphbs.engine);
    
    // 2. establezco extensión para las vistas 
    app.set('view engine', 'hbs')
    
    // 3. CORRECCIÓN: Faltaba el método .join para concatenar la ruta correctamente
    app.set('views', path.join(__dirname, '..', 'views'))
}