from werkzeug.exceptions import InternalServerError

def index(request):
    raise InternalServerError(description="This is a custom Internal server request error message.")