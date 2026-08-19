from datetime import datetime, timezone, timedelta

import bcrypt
from fastapi import Cookie, HTTPException
from jose import JWTError, jwt

from app.config import settings


def create_access_token(subject: str, expires_minutes: int = 30) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=expires_minutes)
    return jwt.encode({"sub": subject, "exp": expire}, settings.jwt_secret, settings.jwt_algorithm)


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))


def get_current_user_id(access_token: str | None = Cookie(default=None)) -> str:
    if not access_token:
        raise HTTPException(401, 'Not authenticated')
    try:
        payload = jwt.decode(access_token, settings.jwt_secret,
                             algorithms=[settings.jwt_algorithm])
    except JWTError:
        raise HTTPException(401, 'Invalid token')
    return payload['sub']
