# Prompts de Inteligencia Artificial (Lovable)

Documentación de los prompts utilizados en la herramienta AI de Lovable para generar la interfaz de VisionaryB2B.

## 1. Hero Section & Landing (Spanish / English)
**Español:** "Genera un Hero section premium para una tienda E-commerce B2B de gafas a medida. Usa un fondo oscuro sofisticado (modo oscuro), texto en gradientes, una fuente moderna como 'Inter' o 'Outfit'. Integra un lienzo 3D en el lado derecho usando `@react-three/fiber` para mostrar un modelo `.glb` de gafas que el usuario pueda rotar con `OrbitControls`."
**English:** "Generate a premium Hero section for a B2B custom eyewear E-commerce store. Use a sophisticated dark mode background, gradient text, and a modern font like 'Inter' or 'Outfit'. Integrate a 3D canvas on the right side using `@react-three/fiber` to display a `.glb` glasses model that the user can rotate using `OrbitControls`."

## 2. Dynamic Vanta.js Background
**Español:** "Añade la librería `vanta.js` (efecto CLOUDS) como fondo interactivo en la vista principal. Asegúrate de que los colores de las nubes cambien dinámicamente según la categoría de gafas seleccionada (Ej: Nubes grises/negras para gafas de sol, nubes azules para gafas de primavera)."
**English:** "Add the `vanta.js` library (CLOUDS effect) as an interactive background in the main view. Make sure the cloud colors change dynamically based on the selected glasses category (e.g., Grey/black clouds for sunglasses, blue clouds for spring glasses)."

## 3. Catálogo (Grid de 4 columnas)
**Español:** "Genera una vista de catálogo de productos usando un Grid de Tailwind CSS de 4 columnas. Cada tarjeta de producto debe tener un efecto de borde luminoso (glow border) al hacer hover. Dentro de cada tarjeta, en lugar de una foto estática, pon un `<ModelPreview>` 3D para que las gafas se dibujen en tiempo real. Añade badges para las categorías y un precio visible."
**English:** "Generate a product catalog view using a 4-column Tailwind CSS Grid. Each product card should have a glow border effect on hover. Inside each card, instead of a static photo, place a 3D `<ModelPreview>` so the glasses are rendered in real-time. Add badges for categories and a visible price."

## 4. Product Panel & Cart Sidebar
**Español:** "Diseña un panel de detalles de producto dividido en dos: Izquierda para el visualizador 3D grande, y Derecha para una tarjeta Glassmorphism con especificaciones técnicas (material, peso). Añade selectores de color para los lentes que actualicen el modelo 3D dinámicamente. Por último, crea un `Sheet` (Sidebar) de carrito usando Shadcn UI donde se listen los items añadidos, cantidades y el cálculo del total."
**English:** "Design a product detail panel split in two: Left for the large 3D viewer, and Right for a Glassmorphism card with technical specifications (material, weight). Add color pickers for the lenses that update the 3D model dynamically. Finally, create a cart `Sheet` (Sidebar) using Shadcn UI where added items, quantities, and the total calculation are listed."
