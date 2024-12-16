# Front-End Challenge - Junior 🚀

Para iniciar la aplcacion debemos movernos hay que seguir estos simples 4 pasos

```git checkout tomas-dopazo```


``` cd challengeatlas```


```npm install```


```npm run dev```

Se abrira en el puerto : http://localhost:5173/

El enlace del proyecto despegado es :
 "https://redatlas.vercel.app/"

## Enfoque 💡

Decidí utilizar Bootstrap debido a su excelente capacidad para diseño responsive, lo que garantiza que la aplicación se adapte correctamente a diferentes dispositivos y tamaños de pantalla. 

Opté por React-Leaflet para los mapas, ya que es una biblioteca gratuita que cumple perfectamente con los requisitos de la aplicación.

Para gestionar el enrutado, implementé React Router, que facilita la navegación entre las distintas vistas

Utilicé UUID para generar identificadores únicos de manera eficiente

La implementacion de estados locales con useStatte useEffect para los efectos de los componentes y la api,

Tambien decidi la validacion de los campos con boostrap, en lo que le da al agregar una propiedad una forma muy dinamica de los cambios en los campos y si arroja un error 


## Desafio
El desafio mas grande fue la implementacion del mapa y que al buscarlo con pais, ciudad, calle y numero se me indique la lat y long, ya que el usuario no tendria que estar poniendo estos paramentros de lat y long.

## Desciciones
Hubiera sido ideal que la API incluyera un parámetro de búsqueda, lo que habría simplificado la elección entre usar el JSON o la propia API. Sin embargo, finalmente opté por utilizar la API, ya que consideré que era la opción más adecuada para los requerimientos de este proyecto.

