# from fastapi import APIRouter, Depends
# from sqlalchemy.orm import Session
# from app.db.database import SessionLocal

# from app.models.product import Product as ProductModel
# from app.schemas.product import ProductCreate, Product, Rating

# router = APIRouter()

# # Dependency
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# @router.get("/products/", response_model=list[Product])
# def get_products(db: Session = Depends(get_db)):
#     products = db.query(ProductModel).all()

#     response = []
#     for product in products:
#         product_dict = product.__dict__.copy()
#         product_dict["rating"] = {"rate": 4.5, "count": 120}  # Default or fake rating
#         response.append(Product(**product_dict))  # Pydantic model

#     return response


# @router.post("/products/", response_model=Product)
# def create_product(product: ProductCreate, db: Session = Depends(get_db)):
#     db_product = ProductModel(
#         title=product.title,
#         price=product.price,
#         description=product.description,
#         category=product.category,
#         image=str(product.image),
#         rate=4.0,  # Hardcoded rating
#         count=100
#     )
#     db.add(db_product)
#     db.commit()
#     db.refresh(db_product)

#     return Product(
#         id=db_product.id,
#         title=db_product.title,
#         price=db_product.price,
#         description=db_product.description,
#         category=db_product.category,
#         image=db_product.image,
#         rating=Rating(rate=db_product.rate, count=db_product.count)
#     )


# routers/products.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.models import product as models, category as category_models  # Ensure correct import for Category model
from app.schemas import product as schemas
from fastapi import UploadFile, File, Form
import cloudinary.uploader
from app.config import cloudinary_config  

router = APIRouter(
    prefix="/store/products",
    tags=["Products"]
)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Create product
@router.post("/", response_model=schemas.ProductOut)
def create_product(
    title: str = Form(...),
    price: float = Form(...),
    description: str = Form(...),
    category_id: int = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    print('Selected file:', image)

    # Upload image to Cloudinary
    upload_result = cloudinary.uploader.upload(image.file)
    image_url = upload_result.get("secure_url")

    # Save to DB
    db_product = models.Product(
        title=title,
        price=price,
        description=description,
        category_id=category_id,
        image=image_url,
        # rate=4.0,
        # count=100
    )
    db.add(db_product)
    db.commit()
    db.refresh(db_product)

    # Attach category
    category = db.query(category_models.Category).filter(
        category_models.Category.id == db_product.category_id
    ).first()
    db_product.category = category

    return db_product

# Get all products
@router.get("/", response_model=list[schemas.ProductOut])
def get_products(db: Session = Depends(get_db)):
    products = db.query(models.Product).all()
    return products

# Get a single product by ID
@router.get("/{product_id}", response_model=schemas.ProductOut)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Fetch category
    category = db.query(category_models.Category).filter(category_models.Category.id == product.category_id).first()
    if category:
        product.category = category  # Add category info to product

    return product

@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(product)
    db.commit()
    return {"detail": "Product deleted successfully"}