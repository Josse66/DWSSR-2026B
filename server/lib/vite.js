//bibloteca file stream
import fs from 'node:fs'

//bibloteca de rutas
import path from 'node:path'

//imports para crear Dirname
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

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
    const viteDevServer = process.env.VITE_DEV_SERVER || 'https://localhost:5173'

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

}