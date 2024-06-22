from werkzeug.exceptions import BadRequest
def index(request):
    raise BadRequest(description="This is a custom bad request error message.")