import json

from flask import Flask, render_template, redirect, request
from werkzeug.security import check_password_hash, generate_password_hash

from user_manager import UserManager

class CustomFlask(Flask):
    jinja_options = Flask.jinja_options.copy()
    jinja_options.update(dict(
        block_start_string='{%',
        block_end_string='%}',
        variable_start_string='%%',
        variable_end_string='%%',
        comment_start_string='<#',
        comment_end_string='#>',
    ))


app = CustomFlask(__name__)
address_file = 'brewkit/interface/data/address.json'

app.user_manager = UserManager()


# User routes
@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def attempt_login():
    attempt_user = request.get_json()
    result = app.user_manager.login(attempt_user)
    return json.dumps(result)

@app.route('/tokens', methods=['GET'])
def serve_tokens():
    return json.dumps(app.user_manager.tokens)

@app.route('/register', methods=['POST'])
def register_new_user():
    new_user = request.get_json()

    return app.user_manager.add_user(new_user)

# Main routes
@app.route('/dashboard')
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/configure')
def configuration():
    return render_template('configure.html')

@app.route('/procedures')
def procedures():
    return redirect('/')

@app.route('/new_address', methods=['POST'])
def set_new_address():
    address = json.loads(request.data)['address']
    with open(address_file, 'w') as fi:
        json.dump({'address': address}, fi)
    return "success"

@app.route('/hardware_address')
def find_address():
    with open(address_file, 'r') as fi:
        data = json.load(fi)
        return data['address']

if __name__ == '__main__':
    app.debug = True
    app.run('0.0.0.0', 5000)
