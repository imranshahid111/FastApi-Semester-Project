from sqlalchemy import Column, Integer, String , Float , ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    price = Column(Float)
    image = Column(String)

    category_id = Column(Integer, ForeignKey("categories.id"))
    category = relationship("Category")