from sqlalchemy.orm import Session
from database import engine, SessionLocal
import models

def seed_data():
    models.Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    if db.query(models.Glass).first():
        print("La base de datos ya contiene registros. Saltando seed...")
        db.close()
        return

    gafas_iniciales = [
        models.Glass(
            name="Aesthetic Flow", reference="B2B-AES-01", price=145.0, category="Look Aesthetic",
            material="Acetato Premium", weight="22g", model_url="/models/aesthetic_flow.glb"
        ),
        models.Glass(
            name="Spring Blossom", reference="B2B-SPR-02", price=120.0, category="Primavera",
            material="Titanio", weight="15g", model_url="/models/spring_blossom.glb"
        ),
        models.Glass(
            name="Summer Ray", reference="B2B-SUM-03", price=95.0, category="Verano",
            material="Policarbonato", weight="18g", model_url="/models/summer_ray.glb"
        ),
        models.Glass(
            name="Dark Matrix", reference="B2B-AES-04", price=160.0, category="Look Aesthetic",
            material="Fibra de Carbono", weight="12g", model_url="/models/dark_matrix.glb"
        ),
        models.Glass(
            name="Classic Vision", reference="B2B-MED-05", price=85.0, category="Gafas de medida",
            material="Metal", weight="20g", model_url="/models/classic_vision.glb"
        ),
        models.Glass(
            name="Sun Shield Pro", reference="B2B-SOL-06", price=110.0, category="Gafas para sol",
            material="TR90", weight="14g", model_url="/models/sun_shield.glb"
        )
    ]
    
    db.add_all(gafas_iniciales)
    db.commit()
    db.close()
    print("¡Base de datos poblada exitosamente con 6 modelos de gafas!")

if __name__ == "__main__":
    seed_data()
