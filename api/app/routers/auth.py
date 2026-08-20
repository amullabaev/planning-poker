from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth import create_access_token, hash_password, verify_password
from app.database import get_session
from app.models import User
from app.schemas import UserCreate, UserLogin


router = APIRouter(prefix='/auth')


@router.post('/register')
async def register(payload: UserCreate, response: Response, session: AsyncSession = Depends(get_session)):
    user = User(email=payload.email,
                hashed_password=hash_password(payload.password))
    session.add(user)
    await session.commit()
    await session.refresh(user)
    token = create_access_token(str(user.id))
    response.set_cookie(key='access_token', value=token,
                        httponly=True, samesite='lax', secure=True, max_age=1800)
    return {'ok': True}


@router.post('/login')
async def login(payload: UserLogin, response: Response, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(User).filter(User.email == payload.email))
    user = result.scalars().first()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(401, 'Invalid credentials')
    token = create_access_token(str(user.id))
    response.set_cookie(key='access_token', value=token,
                        httponly=True, samesite='lax', secure=True, max_age=1800)
    return {'ok': True}
