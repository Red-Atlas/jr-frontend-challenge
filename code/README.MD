# ¡Bienvenidos al desafio de RED ATLAS! 🎉

## 🚀 ¿Cómo empezar?

1. **Clona el proyecto:**
   Para empezar, clona este repositorio usando el siguiente comando. Es importante tener en cuenta la rama ```nehuen-lopez``` :

   ```bash
   git clone https://github.com/Jableed43/RED-challenge.git
   ```

2. **Accede a la carpeta del proyecto:**

   Una vez clonado, navega a la carpeta `code`:

   ```bash
   cd RED-challenge/code
   ```

3. **Instala las dependencias:**

   Para instalar todas las dependencias necesarias, corre el siguiente comando:

   ```bash
   npm install
   ```

4. **Levanta la aplicación:**

   Ahora, ¡estás listo para correr el proyecto! Solo ejecuta:

   ```bash
   npm run dev
   ```

5. **Accede a la aplicación:**

   Abre tu navegador y ve a `http://localhost:5173/` para ver la aplicación en acción. ¡Listo! 🎉


6. **Accede al deploy:**

Abre tu navegador y ve a `https://red-challenge-git-nehuen-lopez-jableed43s-projects.vercel.app/` 

---

## 🧠 Resumen del Enfoque, Desafíos y Decisiones Técnicas

### **Enfoque del Proyecto:**
Este proyecto se centra en la creación y gestión de propiedades, con un diseño y funcionalidad orientados a ofrecer una experiencia fluida y moderna. Se implementaron formularios interactivos, notificaciones visuales con SweetAlert y la generación aleatoria de datos para facilitar la creación de propiedades durante pruebas y simulaciones. Además, se optimizó la carga de datos mediante un sistema de *lazy loading*, asegurando un rendimiento ágil incluso con grandes volúmenes de información.

### **Desafíos:**
1. **Manejo de Datos Dinámicos y Geolocalización:** Integrar latitud y longitud de propiedades de manera eficiente fue un reto, pero se logró una solución flexible.
2. **Paginación y Filtrado:** Crear una paginación efectiva y un filtrado eficiente sin afectar el rendimiento fue clave.
3. **Actualización y Eliminación de Datos:** Asegurarse de que estas operaciones fueran intuitivas y sin fricciones para el usuario.
4. **Diseño Responsivo:** Implementar un scroll vertical en los formularios debido a la cantidad de campos, asegurando una experiencia amigable en diferentes tamaños de pantalla.
5. **Estado y Validación de Formularios:** Mantener los estados de los formularios claros, con retroalimentación visual y gestionando cargas, errores y éxitos.

### **Decisiones Técnicas:**
1. **Uso de Hooks Personalizados:** Se crearon hooks como `useCreateProperty`, `useEditProperty`, y `useFetchProperties` para manejar las operaciones CRUD de manera modular.
2. **SweetAlert para Notificaciones:** Las operaciones de creación, edición y eliminación cuentan con notificaciones visuales que mejoran la experiencia de usuario.
3. **Formularios Dinámicos y Controlados:** Usamos componentes reutilizables de Material-UI para crear formularios responsivos y dinámicos.
4. **Generación Aleatoria de Datos:** Para pruebas, se implementó una función para generar propiedades aleatorias, lo que facilita la carga de datos en el sistema.
5. **Optimización de la Paginación y Filtrado:** La paginación se maneja de forma manual y eficiente, con un filtrado ágil basado en campos de búsqueda.
6. **Desplazamiento Suave:** Se añadió un desplazamiento suave entre páginas para mejorar la fluidez de la navegación.
7. **Manejo del Estado Global y Refetching:** El estado global y el refetching se integraron para asegurar que los datos se mantuvieran actualizados en tiempo real.
