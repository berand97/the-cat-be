# API de Razas de Gatos

Una API backend completa para información de razas de gatos construida con principios de Arquitectura Limpia usando TypeScript, Express.js y MongoDB.

## Arquitectura

Este proyecto sigue los principios de **Arquitectura Limpia** con las siguientes capas:

- **Capa de Presentación**: Controladores y rutas de Express
- **Capa de Aplicación**: Servicios de lógica de negocio con inyección de dependencias
- **Capa de Dominio**: Entidades, interfaces y modelos de dominio
- **Capa de Infraestructura**: Repositorios de base de datos y servicios externos

## Patrones de Diseño

- **MVC + Servicios**: Patrón MVC extendido con capa de servicios dedicada
- **Patrón Repository**: Abstracción de acceso a datos para fácil cambio de base de datos
- **Inyección de Dependencias**: Usando tsyringe para contenedor IoC
- **Patrón DTO**: Objetos de Transferencia de Datos con validación y transformación
- **Patrón Mapper**: Conversión Entidad ↔ DTO

## Tecnologías

- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js
- **Base de Datos**: MongoDB con Mongoose
- **Autenticación**: JWT con bcrypt
- **Validación**: class-validator y class-transformer
- **Inyección de Dependencias**: tsyringe
- **Testing**: Jest con supertest
- **Documentación**: Swagger/OpenAPI
- **Cliente HTTP**: axios (para The Cat API)
- **Seguridad**: helmet, cors, limitación de velocidad

## Estructura del Proyecto

```
src/
├── config/                 # Archivos de configuración
│   ├── config.ts          # Configuración de entorno consolidada
│   ├── container.ts        # Configuración de inyección de dependencias
│   └── swagger.ts          # Configuración de documentación API
├── common/                 # Utilidades compartidas
│   ├── interfaces/         # Interfaces comunes
│   ├── types/             # Definiciones de tipos
│   └── utils/             # Funciones de utilidad
├── core/                   # Capa de dominio
│   ├── entities/          # Entidades de dominio
│   ├── repositories/      # Interfaces de repositorio
│   └── errors/            # Clases de error personalizadas
├── application/            # Capa de aplicación
│   ├── dtos/              # Objetos de Transferencia de Datos
│   ├── interfaces/        # Interfaces de aplicación
│   ├── mappers/           # Mapeadores Entidad-DTO
│   └── services/          # Servicios de lógica de negocio
├── infrastructure/         # Capa de infraestructura
│   ├── database/          # Conexión y modelos de base de datos
│   │   ├── interfaces/    # Interfaces de documentos MongoDB
│   │   └── models/        # Modelos de Mongoose
│   ├── repositories/      # Implementaciones de repositorio
│   └── http/              # Clientes HTTP
├── presentation/           # Capa de presentación
│   ├── controllers/       # Controladores de Express (ultra-delgados)
│   ├── middlewares/       # Middlewares de Express
│   ├── routes/            # Rutas de API
│   └── utils/             # Formateadores de respuesta
└── tests/                  # Archivos de prueba
```

## Comenzar

### Prerequisitos

- Node.js (v18 o superior)
- MongoDB (instancia local o en la nube)
- npm o yarn

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd cat-breeds-api
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configuración del entorno**
   ```bash
   cp .env.example .env
   # Edita .env con tu configuración
   ```

4. **Iniciar MongoDB**
   ```bash
   # MongoDB local
   mongod

   # O usar MongoDB Atlas (nube)
   # Actualizar MONGODB_URI en .env
   ```

5. **Ejecutar la aplicación**
   ```bash
   # Modo desarrollo (con Node.js nativo --watch)
   npm run dev

   # Build de producción
   npm run build
   npm start
   ```

## Variables de Entorno

```env
# Servidor
NODE_ENV=development
PORT=3000
HOST=localhost

# Base de Datos
MONGODB_URI=mongodb://localhost:27017/cat-breeds-api
MONGODB_TEST_URI=mongodb://localhost:27017/cat-breeds-api-test

# JWT
JWT_SECRET=tu-clave-jwt-super-secreta-aqui
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=12

# The Cat API
CAT_API_URL=https://api.thecatapi.com/v1
CAT_API_KEY=tu-clave-cat-api-aqui

# Limitación de Velocidad
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
LOG_FILE=logs/app.log

# CORS
CORS_ORIGIN=*
CORS_CREDENTIALS=false
```

## Endpoints de la API

### Autenticación
- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Inicio de sesión de usuario
- `POST /api/auth/refresh` - Refrescar token de acceso
- `GET /api/auth/profile` - Obtener perfil de usuario
- `POST /api/auth/logout` - Cerrar sesión de usuario

### Razas
- `GET /api/breeds` - Obtener todas las razas (con paginación y filtros)
- `GET /api/breeds/:breed_id` - Obtener raza por ID
- `GET /api/breeds/search?q=query` - Buscar razas por nombre
- `POST /api/breeds/sync` - Sincronizar razas desde The Cat API (Admin)

### Imágenes
- `GET /api/images/breed/:breed_id` - Obtener imágenes por raza
- `GET /api/images/:image_id` - Obtener imagen por ID
- `GET /api/images/random` - Obtener imágenes aleatorias de gatos

### Estado
- `GET /health` - Verificación de estado de la API

## Documentación

Una vez que el servidor esté ejecutándose, visita:
- **Swagger UI**: http://localhost:3000/api-docs
- **OpenAPI JSON**: http://localhost:3000/api-docs.json

## Pruebas

```bash
npm test

# Ejecutar pruebas en modo watch
npm run test:watch

# Ejecutar pruebas con cobertura
npm run test:coverage

# Ejecutar linting
npm run lint

# Formatear código
npm run format
```

## Inyección de Dependencias

La aplicación usa **tsyringe** para inyección de dependencias:

```typescript
container.registerSingleton<IBreedRepository>('IBreedRepository', BreedRepository);

@injectable()
export class BreedService {
  constructor(
    @inject('IBreedRepository') private breedRepository: IBreedRepository
  ) {}
}
```

## Características de Seguridad

- **Autenticación JWT**: Autenticación segura basada en tokens
- **Limitación de Velocidad**: Protección contra ataques DDoS y fuerza bruta
- **Validación de Entrada**: class-validator para validación de DTO
- **CORS**: Intercambio de recursos entre orígenes configurable
- **Helmet**: Headers de seguridad
- **bcrypt**: Hash de contraseñas

## Flujo de Datos

1. **Solicitud** → Controlador (Capa de Presentación)
2. **Controlador** → Servicio (Capa de Aplicación)
3. **Servicio** → Repositorio (Capa de Infraestructura)
4. **Repositorio** → Base de Datos
5. **Base de Datos** → Repositorio → Servicio → Controlador
6. **Controlador** → Respuesta (con DTOs)

## Arquitectura de Responsabilidad Única

El proyecto implementa el **Principio de Responsabilidad Única (SRP)** con:

### Controladores
- Solo manejan el request HTTP
- Llaman al servicio correspondiente
- Formatean y retornan la respuesta

### Middleware de Validación
- Validación automática de DTOs por ruta
- Transformación de datos
- Manejo centralizado de errores de validación

### Formateadores de Respuesta
- Estructura consistente de respuestas API
- Formateo estandarizado de errores
- Timestamps automáticos

### Configuración Modular
- Configuración consolidada con Zod
- Validación de variables de entorno
- Estructura organizada por dominios

## Scripts de Desarrollo

```bash
npm run dev          
npm run build        
npm run start        
npm run test         
npm run test:watch   
npm run test:coverage 
npm run lint         
npm run lint:fix     
npm run format       
npm run type-check   
```