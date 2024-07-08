# Travel Optimizer API

# Parte 1: Introducción

## Introducción

Hola, mi nombre es Roimar Urbano y trabajo en Accenture. Este proyecto es una API desarrollada con NestJS para optimizar rutas de viaje entre estaciones. Utiliza Swagger para la documentación de la API, asegurando que los endpoints estén bien documentados y sean fáciles de utilizar.

## Descripción

El proyecto incluye varios endpoints para gestionar estaciones y rutas, así como para obtener el camino óptimo entre dos estaciones dadas. También incluye servicios de semillas para inicializar la base de datos con datos de prueba.

# Parte 2: Instalación

## Instalación

Para instalar y ejecutar este proyecto localmente, sigue los siguientes pasos:

1. Clona el repositorio:

```bash
   git clone https://github.com/tu-usuario/travel-optimizer-api.git
   cd travel-optimizer-api
```

2. Instala las dependencias:

```bash
   npm install
```

3. Inicia la aplicación:

```bash
 npm run start
```

4. Para iniciar la aplicación en modo de desarrollo:

```bash
  npm run start:dev
```

# Parte 3: Documentación de la API

## Documentación de la API

La documentación de la API está disponible en Swagger (http://localhost:3000/swagger). Aquí puedes encontrar información detallada sobre todos los endpoints disponibles y cómo interactuar con ellos.

# Parte 4: Endpoints

## Endpoints

### Estaciones

- **PUT /stations/:id**: Crear o actualizar una estación.
- **GET /stations**: Obtener todas las estaciones.
- **GET /stations/:id**: Obtener una estación por ID.

### Rutas

- **PUT /paths/:id**: Crear o actualizar una ruta.
- **GET /paths**: Obtener todas las rutas.
- **GET /paths/:id**: Obtener una ruta por ID.
- **GET /paths/:sourceId/:destinationId**: Obtener el camino óptimo entre dos estaciones.

### Semillas

- **GET /seed**: Inicializar la base de datos con datos de estaciones.
- **GET /seed/paths**: Inicializar la base de datos con datos de rutas.

# Parte 5: Pruebas

## Pruebas

Para ejecutar las pruebas, utiliza el siguiente comando:

```bash
npm run test:e2e
```

# Parte 6: Docker

## Docker

Para ejecutar la aplicación usando Docker, sigue estos pasos:

1. Construye y levanta los contenedores:

```bash
docker-compose up --build
```

2. Si los contenedores ya están construidos y solo deseas levantarlos:

```bash
docker-compose up
```
3. Para ejecutar las pruebas:

```bash
docker-compose run test
```
