# Design System - VisionaryB2B

El sistema de diseño de VisionaryB2B se construyó para proyectar autoridad, tecnología avanzada y un sentimiento "Premium".

## 1. Identidad Visual

*   **Tema Base:** Modo Oscuro estricto.
*   **Tipografía:** Fuentes modernas Sans-Serif (`Inter` para legibilidad técnica, `Outfit` o fuentes Display para encabezados).
*   **Estética Core:** Glassmorphism (paneles translúcidos con desenfoque de fondo / `backdrop-blur`) combinados con bordes finos.

![Paleta de Colores](./Pruebas%20Img/Captr%20Ev%204.png)

## 2. Tecnologías y Librerías

| Herramienta | Propósito | Implementación |
| :--- | :--- | :--- |
| **Tailwind CSS** | Styling atómico y responsivo | Uso extensivo de utilidades como `backdrop-blur-md`, `bg-black/40`, `border-border`. |
| **Shadcn UI** | Componentes base accesibles | Botones, Badges, Sheets (para el Sidebar del Carrito), Cards. |
| **Lucide React** | Iconografía | Iconos minimalistas e integrados (`ShoppingCart`, `ArrowRight`, `ShieldCheck`). |
| **React Three Fiber** | Visualización 3D | Renderizado en tiempo real de archivos `.glb` con materiales dinámicos. |
| **Vanta.js** | Fondos Dinámicos | Efectos de partículas interactivos sobre el Canvas (`Vanta.Clouds`). |

## 3. Patrones de UI (Ejemplos)

### Botones y Llamados a la Acción (CTAs)
Se evita el clásico botón sólido aburrido. Los CTAs principales usan efectos translúcidos o animaciones de hover sutiles.
`![Ejemplo de Botón](./Pruebas%20Img/Captr%20Ev%205.png)`

### Tarjetas de Producto
Las tarjetas de catálogo no usan sombras pesadas (`drop-shadow`), sino bordes sutiles que cambian de color (Hover effect) para dar un toque cibernético.
`![Ejemplo de Tarjeta](./Pruebas%20Img/Captr%20Ev%206.png)`

### Panel Lateral (Sheet / Drawer)
El carrito de compras B2B se despliega en un panel oscuro translúcido, manteniendo al usuario anclado en la vista actual sin redirigirlo a otra página.
