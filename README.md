# Backend API REST - Gestión de Productos

API RESTful desarrollada con Node.js y Express para la administración de productos, con autenticación JWT y base de datos Firestore de Firebase.

## Tecnologías utilizadas

- **Node.js** con ESModules
- **Express 5**
- **Firebase / Firestore** como base de datos en la nube
- **JSON Web Tokens (JWT)** para autenticación
- **bcryptjs** para el hash de contraseñas
- **dotenv** para variables de entorno
- **cors** para permitir peticiones de origen cruzado

## Estructura del proyecto

```
src/
├── config/
│   └── firebaseConfig.js       # Configuración y conexión a Firebase
├── controllers/
│   ├── auth.controller.js      # Lógica de autenticación
│   └── products.controller.js  # Lógica de productos
├── middlewares/
│   └── auth.middleware.js      # Verificación de JWT
├── models/
│   ├── Product.js              # Modelo y converter de Firestore
│   └── User.js                 # Modelo de usuario con bcrypt
├── routes/
│   ├── auth.routes.js          # Rutas de autenticación
│   └── products.routes.js      # Rutas de productos
├── services/
│   ├── auth.service.js         # Servicio de login
│   └── products.service.js     # Servicio CRUD de productos
└── index.js                    # Punto de entrada
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=3000
NODE_ENV=development

# Firebase
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=

# JWT
JWT_SECRET_KEY=
```

> Si `NODE_ENV=development` o `FIREBASE_API_KEY` no está definida, la aplicación se conecta automáticamente al emulador local de Firestore en el puerto `8080`.

## Instalación y uso

```bash
# Instalar dependencias
npm install

# Iniciar en producción
npm run start

# Iniciar en desarrollo (con hot reload)
npm run dev
```

## Endpoints

### Autenticación

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| POST | `/auth/login` | Inicia sesión y devuelve un Bearer Token | No |

**Body esperado:**
```json
{
  "email": "usuario@email.com",
  "password": "contraseña"
}
```

**Respuesta exitosa:**
```json
{
  "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Productos

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/products` | Obtiene todos los productos | No |
| GET | `/api/products/:id` | Obtiene un producto por ID | No |
| POST | `/api/products/create` | Crea un nuevo producto | Sí |
| DELETE | `/api/products/:id` | Elimina un producto | Sí |

**Body para crear producto:**
```json
{
  "name": "Nombre del producto",
  "price": 999.99,
  "category": "Categoría",
  "stock": 10,
  "description": "Descripción del producto"
}
```

### Uso del token

Las rutas protegidas requieren enviar el token en el header:

```
Authorization: Bearer <token>
```

## Colecciones en Firestore

### `products`
| Campo | Tipo |
|-------|------|
| name | string |
| price | number |
| category | string |
| stock | number |
| description | string |

### `users`
| Campo | Tipo |
|-------|------|
| name | string |
| email | string |
| password | string (hasheado con bcrypt) |

## Códigos de respuesta

| Código | Descripción |
|--------|-------------|
| 200 | OK |
| 201 | Recurso creado |
| 400 | Campos faltantes o inválidos |
| 401 | Token no proporcionado |
| 403 | Token inválido o expirado |
| 404 | Recurso o ruta no encontrada |
| 500 | Error interno del servidor |
