from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.database import engine
from app.models import Base
from app.routers.tasks import router as task_router
from app.routers.auth import router as auth_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # lifecycle hook
    async with engine.begin() as conn:
        # on startup
        await conn.run_sync(Base.metadata.create_all)
    yield
    # on shutdown after yield


app = FastAPI(title="Planning Poker API", version="1.0.0", lifespan=lifespan)

app.include_router(auth_router)
app.include_router(task_router)
