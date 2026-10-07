//bibloteca file stream
import fs from 'node:fs'

//bibloteca de rutas
import path from 'node:path'

//importando hbs
//importando el template engine Handlebars
import hbs from 'hbs'

//imports para crear Dirname
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { hasSubscribers } from 'node:diagnostics_channel';

//creando las variables de rutas
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/*
*Helper para Handlebars que genera las etiquetas de Vite
EN DESARROLLO: Conecta al servidor de desarrollo de Vite
EN PRODUCCION: Usa los compilados de Vite
*/

export function viteAssets(){
    //Obtener modo de ejecucion
    const isDev = process.env.NODE_ENV !== 'production'
    //rescatanco url del servidor de desarrollo
    const viteDevServer = process.env.VITE_DEV_SERVER || 'http://localhost:5173'

    if(isDev){
        //en desarrollo cargamos los archivos del forntend directamente del servidor de 
        // desarollo de vite
        return `
        <script type="module" src="${viteDevServer}/@vite/client"></script>
        <script type="module" src="${viteDevServer}/main.js"></script>
        `
    }
    //en produccion leemos el manifest y generamos las etiquetas finales de produccion
    const manifestPath= path.join(__dirname, '..', '..', 'dist', 'vite', 'manifest.json') 

    //si no existe lanzamos una alerta
    if(!fs.existsSync(manifestPath)){
        console.warn("Vite manifest not found, Run 'npm run build' ")
        return ''
    }

    //leyendo y parseando a JSON el archivo de manifiesto quwe genera vite en la compilacion
    //de los archivos del fron-end
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
    const mainEntry = manifest["main.js"]
    //guarda el main.js
    if(!mainEntry){
        console.warn('El archivo main.js no esta disposnible en el manisfiseto de Vite.')
        return ''
    }

    let tags = ''
    
    //CSS files
    if(mainEntry.css){
        mainEntry.css.forEach(cssFile => {
            tags += `<link rel='stylesheet' href='/${cssFile}'>\n`
        });
    }

    //JS files
    tags += `<script type='module src="/${mainEntry.file} defer'></script>`

    return tags
}
/*
Funcion registradora del helper de Handlebars
*/
export function registerViteHelper(){
    hbs.registerHelper('viteAssets', ()=> new hbs.SafeString(viteAssets())) //sanitizando la salida del helper
}