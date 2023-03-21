from fastapi import APIRouter

router = APIRouter()

@router.get('/users/', tags=["users"])
async def getUsers():
    return [{"username": "Rick"}, {"username": "Morty"}]