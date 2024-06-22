from werkzeug.exceptions import HTTPException,Unauthorized

def index(request):
    raise Unauthorized(description="This is a custom Http exception request error message.")