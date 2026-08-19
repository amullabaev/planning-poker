from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth import get_current_user_id
from app.database import get_session
from app.models import Task
from app.schemas import TaskCreate, TaskDelete


router = APIRouter(prefix='/api/tasks')


@router.get('')
async def get_all_tasks(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Task))
    return result.scalars().all()


@router.post('', dependencies=[Depends(get_current_user_id)])
async def save_task(payload: TaskCreate, session: AsyncSession = Depends(get_session)):
    task = Task(title=payload.title)
    session.add(task)
    await session.commit()
    await session.refresh(task)
    return task


@router.delete('', dependencies=[Depends(get_current_user_id)])
async def delete_task(payload: TaskDelete, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Task).filter(Task.id == payload.id))
    task = result.scalars().first()

    if task is None:
        raise HTTPException(status_code=404, detail='Task not found')

    await session.delete(task)
    await session.commit()
