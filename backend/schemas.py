from pydantic import BaseModel

class GlassBase(BaseModel):
    name: str
    reference: str
    price: float
    category: str
    material: str
    weight: str
    model_url: str

class GlassCreate(GlassBase):
    pass

class Glass(GlassBase):
    id: int

    class Config:
        from_attributes = True
