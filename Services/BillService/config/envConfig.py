from pydantic import BaseSettings

class Settings(BaseSettings): 
    DEFAULT_VAR: str = "def"

    S1_DOMAIN: str ='localhost:8000'
    S2_DOMAIN: str ='localhost:8001'
    JWT_PASS: str
    
    class Config:
        env_file = "BillService/.env"

settings = Settings()