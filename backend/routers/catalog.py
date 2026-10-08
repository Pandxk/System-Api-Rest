from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
import models, schemas
from database import get_db

router = APIRouter(
    prefix="/api/catalog",
    tags=["catalog"]
)

@router.get("/", response_model=List[schemas.Glass])
def get_catalog(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    glasses = db.query(models.Glass).offset(skip).limit(limit).all()
    return glasses
