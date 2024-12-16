## Instrucciones para levantar el proyecto

1. **Clona el repositorio**:
   ```bash
   git clone <https://github.com/Augusvidal/jr-frontend-challenge.git>
   cd <jr-challenge-frontend>

2. Instala Node.js 20.10.0 con NVM:

   nvm install 20.10.0
   nvm use 20.10.0

3. Instala las dependencias del proyecto:

   npm install

4. Configura las variables de entorno:

   - Crea un archivo `.env` en la raíz del proyecto.
   - Copia el contenido de `.env.example` y pégalo en el archivo `.env`.
   - Reemplaza los valores de las variables con las que consideres adecuadas para tu entorno.

5. Ejecuta el proyecto:

   npm run dev

  Esto abrirá el navegador en http://localhost:5173.

## Tecnologías Usadas

### Frameworks y Lenguajes

- React

- TypeScript

Vite: Por la velocidad y tiempos de arranque más rápidos en comparación a Create React App.

### Estilos

TailwindCSS: Suelo usarlo para los estilos para que sea más rápido y sencillo.

### APIs

Google Maps API: Para integrar un mapa interactivo en las vistas de las propiedades.

Fake API Listings: Simula datos de propiedades usando una API ficticia. Se configuró un proxy en vite.config.ts para manejar problemas de CORS.

### Diseño de UX

Cree las vistas para agregar, editar y eliminar propiedades. Agregue formularios claros con validación para evitar errores de usuario.

Diseños y estilos para que se adapten a todos los dispositivos.

### Favoritos

Agregue un listado de favoritos para que los usuarios puedan guardar sus propiedades favoritas. Para esto agregue un listado de favoritos en el estado global y una función para agregar y eliminar propiedades de este listado.

### Demo en Vercel en vivo:

https://augustovidal-redatlas.vercel.app/


