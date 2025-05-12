# schemas/product.py
from pydantic import BaseModel, HttpUrl

class CategoryOut(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True


class ProductCreate(BaseModel):
    title: str
    price: float
    description: str
    category_id: int  # Link to existing category
    image: str

class ProductOut(BaseModel):
    id: int
    title: str
    description: str
    price: float
    category: CategoryOut  # Change category to use CategoryOut schema
    image: HttpUrl

    class Config:
        orm_mode = True


class Product(ProductCreate):
    id: int

    class Config:
        orm_mode = True
