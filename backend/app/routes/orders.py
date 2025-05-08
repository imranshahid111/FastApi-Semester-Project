from fastapi import APIRouter, Depends, Request
from app.auth.jwt_bearer import JWTBearer

router = APIRouter()

@router.post("/checkout", dependencies=[Depends(JWTBearer())])
def checkout(order: dict, request: Request):
    token = request.headers.get("Authorization").split(" ")[1]
    return {
        "msg": "Order placed successfully ✅",
        "token_used": token,
        "order": order
    }
