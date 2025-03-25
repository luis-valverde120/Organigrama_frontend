# Organigrama Frontend

Este es el lado **frontend** de la aplicación de **Organigrama**, una herramienta diseñada para gestionar y visualizar estructuras organizacionales de manera eficiente.

## Descripción del Proyecto

La aplicación de **Organigrama** permite a los usuarios:
- Crear, actualizar y eliminar organigramas.
- Agregar, actualizar y eliminar nodos dentro de un organigrama.
- Visualizar estructuras organizacionales de forma gráfica e interactiva.

El frontend está desarrollado con **React** y **Next.js**, utilizando componentes reutilizables y una arquitectura modular para facilitar el mantenimiento y la escalabilidad.

## Características Principales

- **Gestión de Organigramas**:
  - Crear nuevos organigramas con nombre y descripción.
  - Eliminar organigramas existentes.
  - Visualizar una lista de organigramas.

- **Gestión de Nodos**:
  - Agregar nodos a un organigrama con información como nombre, título, tipo de cargo y colores personalizados.
  - Actualizar nodos existentes.
  - Eliminar nodos de un organigrama.

- **Visualización Interactiva**:
  - Representación gráfica de los organigramas utilizando **GoJS**.
  - Personalización de colores y estilos de los nodos.

- **Autenticación**:
  - Inicio de sesión y registro de usuarios.
  - Gestión de tokens de acceso y refresco para mantener la sesión activa.

## Tecnologías Utilizadas

- **Framework**: [Next.js](https://nextjs.org/)
- **Librería de Componentes**: React
- **Visualización**: [GoJS](https://gojs.net/)
- **Estilos**: Tailwind CSS
- **Gestión de Estado**: React Hooks
- **Autenticación**: Cookies y LocalStorage
- **API**: Comunicación con el backend mediante fetch y axios.

## Estructura del Proyecto

```
organigrama_frontend/
├── app/
│   ├── components/          # Componentes reutilizables
│   │   ├── Sidebar.tsx      # Barra lateral para navegación
│   │   ├── Organigrama.tsx  # Componente para visualizar organigramas
│   │   └── organigrama/     # Componentes específicos de organigramas
│   ├── hooks/               # Hooks personalizados
│   │   └── useAuth.ts       # Hook para autenticación
│   ├── login/               # Página de inicio de sesión
│   ├── register/            # Página de registro de usuarios
│   ├── organigrama/         # Páginas relacionadas con organigramas
│   │   ├── agregar/         # Página para agregar organigramas
│   │   ├── [id_organigrama]/# Página para gestionar un organigrama específico
│   │   └── layout.tsx       # Layout con barra lateral
│   ├── services/            # Configuración de servicios y API
│   │   └── api.ts           # Configuración de la URL base de la API
├── public/                  # Archivos estáticos
├── styles/                  # Archivos de estilos globales
├── README.md                # Documentación del proyecto
└── package.json             # Dependencias y scripts del proyecto
```

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/organigrama_frontend.git
   cd organigrama_frontend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura la URL base de la API en `app/services/api.ts`:
   ```typescript
   export const API_URL = "http://localhost:5000/api";
   ```

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

5. Abre la aplicación en tu navegador en `http://localhost:3000`.

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Genera una versión optimizada para producción.
- `npm run start`: Inicia el servidor en modo producción.

## Contribución

Si deseas contribuir a este proyecto:
1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz un commit (`git commit -m 'Agrega nueva funcionalidad'`).
4. Envía tus cambios (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

¡Gracias por usar la aplicación de **Organigrama**! Si tienes alguna pregunta o sugerencia, no dudes en contactarnos.
