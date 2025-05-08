from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate
from app.auth.jwt_handler import hash_password

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, user: UserCreate):
    hashed = hash_password(user.password)
    db_user = User(email=user.email, full_name=user.full_name, password=hashed, provider="local")
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def create_google_user(db: Session, email: str, full_name: str):
    db_user = User(email=email, full_name=full_name, provider="google", password=None)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
