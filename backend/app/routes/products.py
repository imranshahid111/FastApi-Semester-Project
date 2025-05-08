from fastapi import APIRouter
import requests

router = APIRouter()

@router.get("/products/")
def get_products():
    response = requests.get("https://fakestoreapi.com/products")
    return response.json()
