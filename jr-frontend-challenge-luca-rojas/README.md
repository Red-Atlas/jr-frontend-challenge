# Development

Pasos para levantar la app en desarrollo

1. Clonar el repositorio o descargarlo en zip
2. Instalar las dependencias necesarias

```
npm install
```

3. Crear archivo .env y agregar las siguientes variable

```
VITE_API_BASE_URL = {URL DE API}
VITE_MAPBOX_API_KEY = {KEY DE MAPBOX}
```

4. En caso de que no funcione reemplazar la url de .env por (Proxy configurado en vite.config.js)

```
VITE_API_BASE_URL = '/api/properties'
```

5. Configuraciones de vite.config.ts

```TYPESCRIPT
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://fake-api-listings.vercel.app",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    outDir: "dist",
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  preview: {
    port: 4173,
  },
});
```

Aclaraciones:

# React-redux

Decidí utilizar un sistema de store global para manejar el estado de las propiedades,
dentro de la carpeta store se encuentran las acciones, las cuales se utilizan para el crud básico,
slice para traer las propiedades al ejecutar la app y un slice para la propiedad seleccionada y mostrar la página de detalles.
Lo trabaje por separado para mantener un código más limpio sin juntar todo en uno solo.

# MaterialUi

Utilicé materialui para la maquetacíon ya que, los componentes por defecto y la personalización que permite, son muy poderosas
y, además, los sistemas de boxes, stack y grids me resultan comodos de utilizar. El porque me decidí por material con respecto a tailwindcss
fue para mantener un código mas limpio de sobrecarga de clases, lo cual lo hace complicado de leer. Utilicé css basico en ciertas. Para alertas de errores
utilicé sweetalert2 ya que permite ejecutar los toast como función y no como componente rjsx.

# React Router

Para las rutas utlicé react router en su versión 7 utilizando BrowserRouter y un sistema de rutas dinamico que da mas limpieza al módulo app.
En caso de necesitar se puede agregar rutas privadas o protegidas mucho mas facil así como tambien la posibilidad de crear rutas hijas.
