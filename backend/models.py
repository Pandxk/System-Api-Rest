from sqlalchemy import Column, Integer, String, Float
from database import Base

class Glass(Base):
    __tablename__ = "glasses"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    reference = Column(String, unique=True, index=True)
    price = Column(Float)
    category = Column(String) # 'Primavera', 'Look Aesthetic', etc.
    material = Column(String)
    weight = Column(String)
    model_url = Column(String) # URL o identificador relativo
