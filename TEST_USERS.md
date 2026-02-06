# Usuarios de Prueba

## 🔐 Credenciales para Desarrollo

Durante el desarrollo, puedes usar los siguientes usuarios de prueba para iniciar sesión:

### Usuario Administrador
- **Email**: `admin@test.com`
- **Contraseña**: `admin123`
- **Rol**: Administrador
- **Nombre**: Administrador

### Usuario Demo
- **Email**: `user@test.com`
- **Contraseña**: `user123`
- **Rol**: Usuario
- **Nombre**: Usuario Demo

### Usuario de Prueba
- **Email**: `test@example.com`
- **Contraseña**: `password123`
- **Rol**: Usuario
- **Nombre**: Test User

## 📝 Notas

- Estos usuarios solo funcionan en **modo desarrollo** (cuando `VITE_USE_MOCK=true` o `import.meta.env.DEV` es verdadero)
- En producción, el sistema se conectará a la API real
- Los usuarios mock simulan una latencia de red de 800ms para una experiencia más realista
- Si introduces credenciales incorrectas, verás un mensaje de error con los usuarios disponibles

## 🔧 Configuración

El sistema detecta automáticamente si está en modo desarrollo y usa los datos mock.

Para forzar el uso de datos mock incluso en producción, agrega a tu `.env`:

```env
VITE_USE_MOCK=true
```

Para usar la API real en desarrollo:

```env
VITE_USE_MOCK=false
VITE_API_URL=http://tu-api.com/api
```

## 🚀 Cómo Iniciar Sesión

1. Abre la aplicación en `http://localhost:5173/`
2. Ingresa uno de los emails y contraseñas de arriba
3. Haz clic en "Iniciar sesión"
4. Serás redirigido al dashboard

## 🔒 Seguridad

⚠️ **IMPORTANTE**: Estos usuarios son solo para desarrollo. En producción:
- Nunca uses contraseñas hardcodeadas
- Implementa autenticación real con tu backend
- Usa variables de entorno para configuración sensible
- Implementa rate limiting y otras medidas de seguridad
