from dotenv import load_dotenv
from flask import Flask, request,g,abort,url_for,session,redirect
from gingerjs.app import App
import os
from flask_cors import CORS
from gingerjs import add_url_rules
from authlib.integrations.flask_client import OAuth
from ginger_auth.auth import Google_Provider,Auth,Credentials_Provider

# Load environment variables from a .env file
load_dotenv()

app = App(__name__, template_folder='build/templates',static_url_path='/static',static_folder='build/static/')
app.secret_key = '!secret'
app.config.from_object('settings')

CORS(app,resources={r"/api/*": {"origins": "*"}})


@app.before_request
def before_request():
    # When you import jinja2 macros, they get cached which is annoying for local
    # development, so wipe the cache every request.
    app.jinja_env.cache = {}
    # user = session.get('user')
    # print(request.path,user)
    # if not user and request.path.startswith("/dbEditor"):
    #     session['next_url'] = request.base_url
    #     return redirect(url_for('login',name="google"))

def login(payload):
    print(payload,"payload")
    return payload

with app.app_context():
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
    Auth(auth_options)

# Generate Flask routes
add_url_rules(os.path.join(os.getcwd(),"src","app"),app,debug=True if os.environ.get('DEBUG')=="True" else False)

if __name__ == '__main__':
    debug_app = os.environ.get('DEBUG')
    
    app.run_app(debug=debug_app,host=os.environ.get('HOST'),port=os.environ.get('PORT'))