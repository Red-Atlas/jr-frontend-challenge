# Front-End Challenge - Junior

Este proyecto es una aplicación web para gestionar propiedades inmobiliarias. Permite a los usuarios agregar, editar y ver propiedades, almacenándolas en `localStorage` para su persistencia.

## Enlace al Proyecto Desplegado

Puedes ver el proyecto en el siguiente enlace:

[Enlace al proyecto desplegado]

## Instrucciones para Instalar y Ejecutar la Aplicación

1. **Instalar las dependencias**:

   ```bash
   npm install
   ```

2. **Ejecutar la aplicación**:
   ```bash
   npm run dev
   ```

# Resumen

## Enfoque

La aplicación está diseñada para gestionar propiedades inmobiliarias. Utiliza React para el frontend y almacena los datos de las propiedades en el localStorage del navegador, lo que hace que los datos persistan incluso después de cerrar el navegador. Tambien cuenta con un diseño responsive lo que hace que el usuario pueda verlo desde cualquier dispositivo.
La estructura de la aplicación está basada en rutas de React, donde el usuario puede:

- Ver las distintas propiedades.
- Ver detalles de una propiedad al hacer clic sobre ella.
- Crear y editar propiedades.

## Desafíos

- Persistencia de datos: Lograr que funcione correctamente el localStorage para el almacenamiento de las propiedades.
- Gestión del estado: Lograr que los filtros, formularios y listado de las propiedades funcionen adecuadamente.
- Diseño Responsivo: Asegurar que la interfaz se adapte correctamente a todos los tamaños de pantalla.

## Decisiones Técnicas

- Estructura de archivos: Separe los distintos archivos en distintas carpetas según su funcionalidad para facilitar el mantenimiento. Por ejemplo: hooks/useProperties
- Configuración de routing: Diseñe las rutas de forma que para el usuario sea fácil de utilizar. Configure una ruta para el listado de propiesdads, otra para el datalle de cada una de ellas y una para poder agregar nuevas propiedades.
- Diseño Mobile-First: Para el diseño lo hice desde dispositivos moviles hasta pantallas de escritorio.
- LocalStorage: Para persistir los datos entre sesiones, elegí usar localStorage como una solución simple y eficaz.
- Funciones Asíncronas: Implemente funciones asíncronas para simular las peticiones a una API, lo que hace que el código sea más escalable en caso de que se decida integrar una en el futuro.

## Tecnologías utilizadas

- React: Para gestionar la interfaz de usuario y por facilidad que tiene para crear componentes reutilizables.
- Css vanilla: Para poder personalizar todos los estilos.
- React Router Dom: Para gestionar las distintas rutas y permitir la navegación entre las distintas vistas que tiene la aplicación web.
- Google Maps: Para poder intregar un mapa que gerenere facilidad al usuario a la hora de ver la ubicación.
