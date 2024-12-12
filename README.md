# Front-End Challenge - Junior 🚀

## Ejecutar en local
* Crear archivo `.env` y llenar las variables de entorno.
* Ejecutar `npm install` para instalar los paquetes de Node.
* `npm run dev` para levantar la aplicacion que se estara ejecutando en el puerto `5173`.


## Despliege ⭐️
https://jr-frontend-challenge-rec-atlas.vercel.app/


## Resumen

### Enfoque del Proyecto  
El objetivo del proyecto era diseñar e implementar una aplicación sencilla para listar propiedades inmobiliarias, la gestión del estado de la aplicación, la implementación de un diseño responsivo y el uso de rutas para la navegación. La solución debía ser funcional, visualmente atractiva y eficiente.

### Herramientas Utilizadas  
- **React**: Para el desarrollo de componentes reutilizables y la gestión del ciclo de vida de la aplicación.  
- **Tailwind CSS**: Para la estilización rápida y responsiva, asegurando una interfaz moderna y consistente.  
- **React Router DOM**: Para manejar la navegación y las rutas entre diferentes vistas de la aplicación.  
- **Mapbox**: Para mostrar mapas interactivos, permitiendo ubicar las propiedades en un contexto geográfico.  

### Desafíos Enfrentados    
2. **Diseño Responsivo**: Implementar una interfaz que se adaptara fluidamente a diferentes tamaños de pantalla, desde dispositivos móviles hasta pantallas de escritorio.  
3. **Gestión del Estado**: Asegurar que el estado de la aplicación, como el listado de propiedades y los filtros aplicados, se manejara de forma eficiente y consistente.  
4. **Mapa Interactivo**: Configurar y personalizar Mapbox para mostrar la ubicación de las propiedades, integrando datos dinámicos provenientes de la API.

### Decisiones Técnicas  
1. **Estructura de Componentes**: Dividí la aplicación en componentes pequeños y reutilizables (por ejemplo, `PropertyCard`) para facilitar el mantenimiento y la escalabilidad.  
2. **Gestión del Estado con React Hooks**: Utilicé `useState` y `useEffect` para manejar datos de las propiedades y actualizar la interfaz en tiempo real.  
3. **Diseño Mobile-First**: Construí la interfaz con un enfoque "mobile-first" usando las utilidades de Tailwind para garantizar una experiencia fluida en dispositivos móviles.  
4. **Routing Intuitivo**: Configuré rutas para una experiencia de usuario fluida, como una vista principal de listado, una vista detallada de cada propiedad y una para agregar propiedades (`/create`).  
5. **Optimización de Performance**: Implementé carga condicional y paginación para evitar tiempos de carga largos al listar propiedades.
6.  **Integración de APIs**: A efectos practicos decidi utilizar el json `properties.json` ya proporcionado, guardando lo en el `localStorge`, aunque esta misma implmentacion serviria para una API externa.

Este desafío permitió demostrar habilidades técnicas clave para el desarrollo front-end, como el manejo de herramientas modernas, la resolución de problemas comunes en aplicaciones web y la implementación de un diseño atractivo y funcional.