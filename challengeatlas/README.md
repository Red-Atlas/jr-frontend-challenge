# Front-End Challenge - Junior 🚀

Para iniciar la aplcacion debemos movernos hay que seguir estos simples 4 pasos

```git checkout tomas-dopazo```


```cd challengeatlas```


```npm install```


```npm run dev```

Se abrira en el puerto : http://localhost:5173/

El enlace del proyecto desplegado es :
 https://redatlas.vercel.app/

## Enfoque 💡

Decidí utilizar Bootstrap debido a su excelente capacidad para diseño responsive, lo que garantiza que la aplicación se adapte correctamente a diferentes dispositivos y tamaños de pantalla. 

Opté por React-Leaflet para los mapas, ya que es una biblioteca gratuita que cumple perfectamente con los requisitos de la aplicación.

Para gestionar el enrutado, implementé React Router, que facilita la navegación entre las distintas vistas

Utilicé UUID para generar identificadores únicos de manera eficiente

La implementacion de estados locales con useStatte useEffect para los efectos de los componentes y la api,

También decidí implementar la validación de los campos utilizando Bootstrap, lo que permite una manera muy dinámica de manejar los cambios en los campos. Además, si ocurre un error, se muestra de manera clara

## Desafio
El desafio mas grande fue la implementacion del mapa y que al buscarlo con pais, ciudad, calle y numero se me indique la lat y long, ya que el usuario no tendria que estar poniendo estos paramentros de lat y long.

## Decisiones
En la documentación que provee el fake API, vemos que acepta como parámetros limit y page, lo cual mejora la eficiencia cuando se tiene que manejar grandes volúmenes de datos, ya que permite obtener X cantidad de items por cada página en la que el usuario navega,  pero al no tener como parámetro titulo o dirección limita al usuario a que solo pueda buscar entre, pongamos de ejemplo 10 items si el limit = 10.

Por esto se tomo la decisión que no es la más eficiente para el sistema, ya que trae un volumen de 10000 items en una sola consulta en pos de permitirle al usuario ser más flexible con la búsqueda, al tener más items puede utilizar el input para filtrar por titulo o dirección.

Para mejorar este punto creo que se podría agregar un parametro más al API, de manera tal que permite traer por páginas y limite, pero también por titulo, dirección o cualquier otro parámetro que se considere necesario.

# pequeño detalle del commit
los commits se muestran el 16 los utlimos por mal horario de mi pc

 