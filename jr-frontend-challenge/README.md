# Development
Pasos para levantar la app en desarrollo

1. Clonar el repositorio o descargarlo en zip
2. Instalar las dependencias necesarias
```
npm install
```

3. Crear archivo .env y agregar la siguiente variable
```
VITE_API_BASE_URL = {URL DE API}
```

4. En caso de que no funcione reemplazar la url de .env por (Proxy configurado en vite.config.js)
```
VITE_API_BASE_URL = '/api/properties'
```
