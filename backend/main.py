from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import models
from database import engine
from routers import catalog

# Creamos las tablas
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Visionary B2B API")

# Configuración CORS para permitir peticiones desde Vite
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # En producción cambiar por el dominio real
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(catalog.router)

@app.get("/")
def root():
    return {"message": "Bienvenido a la API B2B"}
