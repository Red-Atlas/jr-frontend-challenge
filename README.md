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



Tecnologías Usadas
Frameworks y Lenguajes:

  React
  TypeScript
  Vite

Estilos:

  TailwindCSS

APIs:

  Google Maps API (para mapa interactivo).
  Fake API Listings (con proxy configurado en vite.config.ts para usar en local si hay problemas de CORS).

Demo en Vercel en vivo:

https://jr-frontend-challenge-sepia.vercel.app/
