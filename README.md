# Challenge Red Atlas

Este proyecto es una aplicación construida con **React**, **Vite** y **TypeScript**, que incluye **TailwindCSS** y **Mapbox** para mapas interactivos. El objetivo es mostrar una solución simple y eficiente que pueda desplegarse fácilmente.

## 🛠️ Instalación y configuración local

Sigue estos pasos para instalar y ejecutar la aplicación en tu entorno local:

1. Clonar el repositorio

2. Instalar dependencias

npm install

3. Configurar variables de entorno
4. 
Crea un archivo .env en la raíz del proyecto y agrega las siguientes claves, para facilidad de uds les facilite unas aca:

VITE_MAPBOX_TOKEN=pk.eyJ1IjoibHVjYXNjYWx2ZXR0aSIsImEiOiJja3lzYjFqbjAwMjZ2MnhwZHIxajNlMmo1In0.4HJSt33L3PDqtBmx5EopMQ
VITE_IMGBB_API_KEY=70b8122d49a7b2381e171d65038b91cd

4. Ejecutar el servidor de desarrollo
Inicia el servidor local con el siguiente comando:

npm run dev

La aplicación estará disponible en http://localhost:5173.


## Link de produccion:

https://vercel.com/lucascalvettis-projects/challenge-red-atlas

## Resumen:

Al inicio del desarrollo, enfrenté dificultades para acceder a los datos de la API directamente desde el navegador, probablemente debido a restricciones de CORS. Una vez resuelto este inconveniente, evalué la posibilidad de crear mi propia API para gestionar las búsquedas de propiedades de manera más eficiente. Mi idea era consultar toda la información desde el backend y aplicar los filtros necesarios en esa capa.

Sin embargo, debido a las limitaciones de tiempo y con el objetivo de tener la aplicación lista para el domingo, tomé la decisión de traer todos los datos al frontend y aplicar los filtros directamente desde allí. Soy consciente de que esta no es la mejor solución desde el punto de vista de rendimiento y escalabilidad, pero en este contexto me pareció la opción más rápida y práctica.

Durante el desarrollo, se me ocurrieron varias ideas interesantes que, por cuestiones de tiempo, no pude implementar. Por ejemplo, agregar una funcionalidad que permita encontrar propiedades dentro de un rango específico de kilómetros utilizando la geolocalización del usuario. Es una característica que ya implementé previamente en una aplicación para mascotas perdidas que desarrollé, y con herramientas como Algolia habría sido relativamente sencillo integrarla.

A pesar de los desafíos, el proceso fue muy enriquecedor y disfruté mucho del reto. Espero tener la oportunidad de participar en la entrevista presencial, donde podré brindar más detalles sobre mis decisiones técnicas, el enfoque utilizado y las soluciones que contemplé durante el desarrollo.


