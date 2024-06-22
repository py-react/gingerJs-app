from flask import session

def index(request):
    authenticated = "unauthenticated"
    if "user" in  session:
        authenticated = "authenticated"
    return {"authenticated":authenticated}