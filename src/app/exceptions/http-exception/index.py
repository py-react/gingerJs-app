from werkzeug.exceptions import HTTPException,Unauthorized

def index(request):
    raise HTTPException(description="This is a custom Http exception request error message.")