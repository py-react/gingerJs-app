from flask import session

def layout(request):
    authenticated = "unauthenticated"
    if "user" in  session:
        authenticated = "authenticated"
    return {"isDev":"true","authStatus":authenticated,"user":session.get("user") if "user" in  session  else {}}