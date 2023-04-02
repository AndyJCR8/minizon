from pydantic import BaseSettings

class Settings(BaseSettings): 
    DEFAULT_VAR: str = "def"
    DB_HOST: str
    DB_USER: str
    DB_PASS: str = ''

    DB_NAME: str = 's1Users'

    S2_DOMAIN: str ='localhost:8001'
    S3_DOMAIN: str ='localhost:8002'

    PVK_NAME: str = 'private_key'
    PBK_NAME: str = 'public_key'
    JWT_PASS: str
    
    class Config:
        env_file = "app/.env"

settings = Settings()