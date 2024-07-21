
async def index(request):
    authenticated = "unauthenticated"
    if "user" in request.session:
        authenticated = "authenticated"
    return {"authenticated":authenticated}


async def layout(request):
    authenticated = "unauthenticated"
    if "user" in  request.session:
        authenticated = "authenticated"
    return {"isDev":"true","authStatus":authenticated,"user":request.session.get("user") if "user" in  request.session  else {}}