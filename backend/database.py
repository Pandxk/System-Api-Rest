from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import declarative_base
import os

# Usaremos postgres_b2b_data como volumen, la base de datos se llamará b2b_db
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+psycopg://postgres:password@localhost:5445/b2b_db")

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
