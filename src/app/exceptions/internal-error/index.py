from fastapi.exceptions import HTTPException

async def index(request):
    raise HTTPException(detail="This is a custom Internal server request error message.",status_code=501)