
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    jwt_secret: str
    database_url: str
    jwt_algorithm: str = 'HS256'

    class Config:
        env_file = '.env'


settings = Settings()  # type: ignore[call-arg]
