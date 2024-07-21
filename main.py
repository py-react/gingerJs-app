from dotenv import load_dotenv
from gingerjs.app import App
from ginger_auth.auth import Google_Provider,Auth,Credentials_Provider
from starlette.middleware.sessions import SessionMiddleware

# Load environment variables from a .env file
load_dotenv()

app = App(__name__)

def login(payload):
    print(payload,"payload")
    return payload

auth_options = {
        'providers': [
            Google_Provider(),
            Credentials_Provider(login)
            # Twitter_Provider,
            # Github_Provider,
            # ...add more providers here
        ],
        "login_page":"/login",
        "protected_routes":["/dbEditor"]
    }
Auth(auth_options,app)

app.add_middleware(SessionMiddleware, secret_key="secret-string") 

