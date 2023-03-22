from pydantic import BaseSettings

class Settings(BaseSettings): 
    DEFAULT_VAR: str = "def"
    DB_HOST: str
    DB_USER: str
    DB_PASS: str = ''

    DB_NAME: str = 's1Users'

    JWT_PASS: str
    
    class Config:
        env_file = "app/.env"

settings = Settings()