# Reconciliation Explorer

Una aplicación moderna de React con TypeScript construida con arquitectura feature-based.

## 🏗️ Arquitectura

Este proyecto utiliza una **arquitectura feature-based** que organiza el código por características de negocio en lugar de por tipo de archivo. Esto mejora la escalabilidad, mantenibilidad y facilita el trabajo en equipo.

### Estructura del Proyecto

```
src/
├── features/              # Características de la aplicación
│   └── auth/             # Feature de autenticación
│       ├── components/   # Componentes específicos de auth
│       ├── hooks/        # Hooks personalizados de auth
│       ├── pages/        # Páginas de auth
│       ├── services/     # Servicios API de auth
│       ├── stores/       # Estado global de auth (Zustand)
│       ├── types/        # Tipos TypeScript de auth
│       ├── utils/        # Utilidades de auth
│       ├── validators/   # Validaciones Zod de auth
│       └── index.ts      # Barrel export
├── shared/               # Código compartido entre features
│   ├── components/       # Componentes reutilizables (Input, Button, etc.)
│   ├── hooks/            # Hooks compartidos
│   ├── types/            # Tipos compartidos
│   └── utils/            # Utilidades compartidas
├── layouts/              # Layouts de la aplicación
├── routes/               # Configuración de rutas
└── config/               # Configuración global
```

## 🚀 Tecnologías

- **React 19** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **React Router DOM** - Enrutamiento
- **Zustand** - Gestión de estado global
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas
- **Axios** - Cliente HTTP
- **Vitest** - Testing
- **ESLint + Prettier** - Linting y formateo

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Copiar archivo de variables de entorno
cp .env.example .env

# Iniciar servidor de desarrollo
npm run dev
```

## 🛠️ Scripts Disponibles

```bash
npm run dev          # Inicia el servidor de desarrollo
npm run build        # Construye para producción
npm run preview      # Preview de la build de producción
npm test             # Ejecuta los tests
npm test:ui          # Ejecuta los tests con UI
npm run lint         # Ejecuta el linter
npm run format       # Formatea el código
```

## 🔐 Feature: Autenticación

El módulo de autenticación incluye:

- ✅ Login con validación de formularios (React Hook Form + Zod)
- ✅ Gestión de estado con Zustand + persistencia
- ✅ Protección de rutas
- ✅ Manejo de tokens JWT
- ✅ Refresh token automático
- ✅ UI moderna con animaciones
- ✅ Componentes reutilizables (Input, Button)
- ✅ Manejo de errores
- ✅ Accesibilidad (ARIA labels, keyboard navigation)
- ✅ Responsive design

### Uso del Hook de Autenticación

```typescript
import { useAuth } from '@/features/auth';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  // Tu lógica aquí
}
```

## 📊 Feature: Dashboard

El módulo de dashboard incluye:

- ✅ Layout principal con Navbar y Sidebar
- ✅ Tarjetas de estadísticas con gradientes modernos
- ✅ Actividad reciente con timestamps
- ✅ Navegación colapsable
- ✅ Información del usuario en navbar
- ✅ Estados de carga y error
- ✅ Gestión de estado con Zustand
- ✅ Datos mock para desarrollo
- ✅ Diseño responsive
- ✅ Animaciones suaves

### Uso del Hook de Dashboard

```typescript
import { useDashboardData } from '@/features/dashboard';

function MyComponent() {
  const { stats, recentActivity, isLoading, error, refetch } = useDashboardData();

  // Tu lógica aquí
}
```

### Componentes del Dashboard

- **StatsCard**: Tarjeta de estadística con icono y valor
- **RecentActivity**: Lista de actividad reciente
- **Navbar**: Barra de navegación superior
- **Sidebar**: Menú lateral de navegación
- **MainLayout**: Layout principal para páginas protegidas


## 🎨 Buenas Prácticas Implementadas

### 1. **Separación de Responsabilidades**
- Componentes solo manejan UI
- Lógica de negocio en services
- Estado global en stores
- Validaciones en validators

### 2. **Tipado Fuerte**
- Interfaces TypeScript para todos los datos
- Validación en runtime con Zod
- Type inference automático

### 3. **Reutilización**
- Componentes compartidos en `/shared`
- Hooks personalizados
- Barrel exports para imports limpios

### 4. **Accesibilidad**
- Labels semánticos
- ARIA attributes
- Navegación por teclado
- Mensajes de error descriptivos

### 5. **Performance**
- Code splitting por rutas
- Lazy loading de componentes
- Optimización de re-renders

### 6. **Testing**
- Configuración de Vitest
- Testing Library para componentes
- Tests unitarios y de integración

## 🔒 Variables de Entorno

Crea un archivo `.env` basado en `.env.example`:

```env
VITE_API_URL=http://localhost:3000/api
VITE_ENV=development
```

## 📝 Convenciones de Código

- **Componentes**: PascalCase (ej: `LoginForm.tsx`)
- **Hooks**: camelCase con prefijo `use` (ej: `useAuth.ts`)
- **Tipos**: PascalCase con sufijo (ej: `User`, `LoginCredentials`)
- **Constantes**: UPPER_SNAKE_CASE
- **Archivos CSS**: Mismo nombre que el componente

## 🤝 Contribuir

1. Crea una nueva feature en `src/features/`
2. Sigue la estructura existente
3. Añade tests
4. Ejecuta linter y formatter
5. Crea un PR

## 📄 Licencia

MIT
