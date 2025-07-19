
# Library Management Front

Este proyecto es una aplicación web para la gestión de libros, desarrollada con React y Vite. Permite a los usuarios registrarse, iniciar sesión y gestionar libros y usuarios dentro de una biblioteca privada. Es el frontend de un sistema de administración de libros.

## Descripción

La aplicación permite:
- Registro y autenticación de usuarios.
- Visualización y gestión de libros.
- Gestión de usuarios.
- Navegación protegida mediante rutas privadas.

## Arquitectura

- **Frontend:** React + TypeScript
- **Gestión de rutas:** React Router
- **Consumo de servicios:** Fetch API
- **Contexto global:** React Context API para autenticación
- **Estilos:** CSS Modules
- **Estructura de carpetas:**
  - `components/`: Componentes reutilizables (NavBar, Footer, Layout)
  - `context/`: Contextos globales (AuthContext)
  - `hooks/`: Custom hooks (useLogin, useRegister, useLibrary)
  - `models/`: Tipos y modelos TypeScript
  - `pages/`: Vistas principales (Home, Login, Register, LibraryManagement)
  - `routes/`: Rutas y protección de rutas (PrivateRoute, RouterApp)
  - `services/`: Servicios para interactuar con el backend (libraryService, userService)
  - `utils/`: Utilidades y helpers

## Requisitos previos

- Node.js >= 18.x
- npm >= 9.x

## Instalación y configuración local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/abrugiafredodw/library-management-front.git
   cd library-management-front
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Si la aplicación requiere variables de entorno (por ejemplo, URL del backend), crea un archivo `.env` en la raíz del proyecto y define las variables necesarias o renombre el `.env.example`, por ejemplo:
   ```env
   BASE_API_URL=http://localhost:3000/api
   ```

4. **Ejecutar la aplicación en modo desarrollo:**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:5173` (o el puerto que indique Vite).

## Scripts disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Genera la build de producción.
- `npm run preview`: Previsualiza la build de producción.

## Autor

Desarrollado por Ariel Brugiafredo para Darwoft.

---

Si tienes dudas o sugerencias, puedes abrir un issue en el repositorio o contactar al autor.
