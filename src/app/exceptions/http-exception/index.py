from fastapi.exceptions import HTTPException

async def index(request):
    raise HTTPException(detail="This is a custom Http exception request error message.",status_code=500)