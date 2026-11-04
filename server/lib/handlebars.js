import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {create as createHbsEngine } from 'express-handlebars'

import { registerViteHelper } from './vite.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//exportar la funcion de configuracion
export default function configureHandlebars(app){
  //estableciendo la extension de las vistas en .hbs y estableciendo el layout principal de main
  const exphbs = createHbsEngine({
    extname: ".hbs",
    defaultLayout: "main",
  })
  
  //registando el helper de vite
  registerViteHelper(exphbs.handlebars)

  //registrando handlebars en la app de express
  // 1. registro el engine y su nombre
  app.engine('hbs', exphbs.engine)
  // 2. registro el engine previamente dado de alta
  app.set("view engine", 'hbs')
  //3. establecemos el directorio de vistas
  app.set( "views", path.join(__dirname, "..", "views"))
}