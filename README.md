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

React: Para crear interfaces de usuario dinámicas y componentes reutilizables.

TypeScript: Para garantizar tipado estático y prevenir errores en tiempo de desarrollo.

Vite: Por su velocidad superior en el proceso de desarrollo gracias a su enfoque de bundling moderno y tiempos de arranque más rápidos en comparación con alternativas como Create React App.

### Estilos

TailwindCSS: Una herramienta de utilidad para estilos que permite crear diseños consistentes de forma rápida.

### APIs

Google Maps API: Para integrar un mapa interactivo en las vistas de las propiedades.

Fake API Listings: Simula datos de propiedades usando una API ficticia. Se configuró un proxy en vite.config.ts para manejar problemas de CORS durante el desarrollo local.

### Diseño de UX

El diseño se centró en ofrecer una experiencia intuitiva y fluida, minimizando los pasos necesarios para realizar tareas clave. Se priorizaron las siguientes funcionalidades:

Vistas para agregar, editar y eliminar propiedades: Proveen formularios claros con validación para evitar errores de usuario.

Interfaz moderna y receptiva: Optimizada para dispositivos móviles y de escritorio, asegurando accesibilidad.


### Demo en Vercel en vivo:

https://augustovidal-redatlas.vercel.app/

