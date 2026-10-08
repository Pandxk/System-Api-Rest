# 🕶️ VisionaryB2B — Plataforma E-commerce 3D

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white)

> **Pivote Estratégico:** Originalmente un proyecto web clásico, VisionaryB2B evolucionó a una experiencia de E-commerce 3D altamente interactiva enfocada en la personalización de gafas con tecnología React Three Fiber, respaldada por un motor de base de datos relacional robusto (PostgreSQL) y una API ultrarrápida (FastAPI).

---

## 📸 Galería de la Plataforma y Documentación

| Área | Visualización |
| :--- | :--- |
| **Página de Inicio (Hero)** | ![Vista Principal](./Pruebas%20Img/Captr%20Ev%201.png) |
| **Catálogo Dinámico 3D** | ![Catálogo](./Pruebas%20Img/Captr%20Ev%202.png) |
| **Prueba de Despliegue en Docker** | ![Contenedor Docker](./Pruebas%20Img/Captr%20Ev%203.png) |
| **Documentación: Prompts de Lovable** | ![Lovable Prompts](./Pruebas%20Img/Captr%20Ev%205.png) |
| **Documentación: Sistema de Diseño** | ![Design System](./Pruebas%20Img/Captr%20Ev%206.png) |

---

## 🏗️ Arquitectura del Sistema

El proyecto sigue una arquitectura Full-Stack modular orientada a microservicios simulados a través de Docker.

```text
📁 VisionaryB2B/
├── 📁 backend/                  # Servidor FastAPI
│   ├── 📁 models/               # Modelos SQLAlchemy (glasses.py)
│   ├── 📁 routers/              # Endpoints API REST (catalog.py)
│   ├── 📁 schemas/              # Pydantic Schemas (product.py)
│   ├── 📄 main.py               # Entrypoint FastAPI
│   ├── 📄 database.py           # Conexión DB
│   └── 📄 seed.py               # Población inicial de la BD
│
├── 📁 docs/                     # Documentación técnica
│   ├── 📄 design_system.md      # Guía de estilo y UI/UX
│   └── 📄 lovable_prompts.md    # Ingeniería de Prompts (IA)
│
├── 📁 src/                      # Frontend (React + Vite + TanStack)
│   ├── 📁 components/           
│   │   ├── 📁 3d/               # ModelViewer.tsx y renderizado GLTF
│   │   ├── 📁 storefront/       # Componentes E-commerce (Cart, Catalog)
│   │   └── 📁 ui/               # Shadcn UI base
│   ├── 📁 lib/                  # Hooks y utilidades
│   ├── 📁 pages/                # Vistas principales
│   ├── 📁 routes/               # Enrutamiento jerárquico
│   ├── 📁 services/             # Integración con Backend (api.ts)
│   └── 📄 index.css             # Tailwind y variables CSS
│
└── 📄 docker-compose.yml        # Orquestación de Infraestructura
```

---

## 🚀 Despliegue Local (Docker)

El proyecto está diseñado para levantarse con un solo comando gracias a la magia de Docker Compose, el cual orquestará PostgreSQL, preparará los volúmenes de datos e inyectará las variables de entorno.

**Requisitos:** Tener Docker Desktop instalado.

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/web_react_glasses.git
cd web_react_glasses

# 2. Levantar la infraestructura
docker-compose up -d

# 3. Lanzar la Base de Datos (Opcional, en caso de estar limpia)
cd backend
python seed.py

# 4. Lanzar Frontend y Backend
npm install
npm run dev
```
> **Endpoints disponibles:**  
> Frontend: `http://localhost:8080/`  
> Backend API Swagger: `http://localhost:8001/docs`
