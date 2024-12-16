# Proyecto React + TypeScript + Vite

Este proyecto es una aplicación web construida con **React**, **TypeScript** y **Vite**, que ofrece una configuración mínima para trabajar con estas tecnologías. El objetivo es proporcionar una base sólida para crear aplicaciones rápidas y escalables con soporte para HMR.


## Instalación y Ejecución

Para comenzar con el proyecto localmente, sigue estos pasos:

### 1. Clonar el repositorio

Hacer un clone del repositorio con git clone


### 2. Instalar dependencias

npm install

### 3. Archivo .env

Copia el archivo .env.example a .env y ajusta los valores de API keys.

### 3. Correr

Corre el comando npm run dev

### Enfoque

En este proyecto, elegí utilizar Vite como herramienta de construcción debido a su velocidad y excelente experiencia de desarrollo. Vite permite una recarga instantánea de módulos (HMR), lo que hace que el proceso de desarrollo sea mucho más ágil.

Para gestionar el enrutado de las páginas y la navegación entre vistas, implementé React Router. Esta biblioteca me permite estructurar de forma eficiente las rutas de la aplicación y gestionar las vistas de manera modular.

Dado que este proyecto está desarrollado con React y TypeScript, me aseguré de implementar un sistema de tipos que mejora la seguridad del código y facilita la detección de errores en tiempo de compilación, lo cual es fundamental para mantener la calidad del código a medida que el proyecto crece.

Además, utilicé React Hooks como useState y useEffect para gestionar el estado de los componentes y realizar peticiones a la API de manera eficiente. Los React Hooks proporcionan una manera limpia y concisa de manejar la lógica de los componentes y los efectos secundarios.

Para gestionar las configuraciones sensibles y las claves de API, implementé un archivo .env que se encuentra incluido como ejemplo (.env.example), lo cual facilita la personalización de la configuración sin comprometer la seguridad del código fuente.

Este enfoque me permitió desarrollar una aplicación eficiente, escalable y fácil de mantener, asegurando una experiencia de usuario fluida y sin errores.

### Enfoque

Uno de los desafíos más significativos fue integrar la API de Google Maps para mostrar el pin de la propiedad en el mapa. Esto requería asegurar que los marcadores se posicionaran correctamente con las coordenadas de latitud y longitud, y al mismo tiempo gestionar las claves de API de forma segura. Superé este desafío utilizando la biblioteca @react-google-maps/api, lo que me permitió integrar el mapa con facilidad y mostrar el marcador de forma dinámica para cada propiedad.

También implementé un sistema de validación dinámica de formularios utilizando una combinación de TypeScript y lógica en los componentes, lo que permite una gestión clara de errores y una experiencia de usuario amigable.

### Decisiones

SCSS: Elegí SCSS por su capacidad para organizar mejor los estilos mediante variables, anidamiento y reutilización de código. Esto facilita la gestión de un sistema de estilos escalable y modular, ideal para proyectos en crecimiento.

API de Google Maps: Usé la API de Google Maps para mostrar el pin de las propiedades debido a su flexibilidad y funcionalidades avanzadas como geolocalización y personalización de marcadores. Ofrece una integración sencilla con mapas interactivos, ideal para este tipo de aplicación.

React Router: Utilicé React Router para gestionar las rutas y navegación sin recargar la página, permitiendo una experiencia de usuario fluida en esta aplicación.

Vite: Elegí Vite por su rápida velocidad de compilación y recarga, lo que mejora la eficiencia del desarrollo, especialmente con React y TypeScript.