from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, products , category
from app.db.database import Base, engine
from app.routes import orders

# Create FastAPI app ONCE
app = FastAPI()

# Enable CORS for frontend (Vite: port 5173)
origins = ["http://localhost:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can specify frontend URL instead of "*"
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables
Base.metadata.create_all(bind=engine)

# Register routes
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(products.router, prefix="/store", tags=["Products"])
app.include_router(category.router, prefix="/catgeory", tags=["Category"])
app.include_router(orders.router, prefix="/order", tags=["Order"])
