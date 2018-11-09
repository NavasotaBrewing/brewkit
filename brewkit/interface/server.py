import json

from flask import Flask, render_template, redirect
from flask_socketio import SocketIO


class CustomFlask(Flask):
    jinja_options = Flask.jinja_options.copy()
    jinja_options.update(dict(
        block_start_string='<%',
        block_end_string='%>',
        variable_start_string='%%',
        variable_end_string='%%',
        comment_start_string='<#',
        comment_end_string='#>',
    ))


app = CustomFlask(__name__)
socket = SocketIO(app)

@app.route('/')
def index():
    return redirect('/dashboard')

@app.route('/dashboard')
def dashboard():
    return render_template('index.html')

@app.route('/configure')
def configure():
    return render_template('configure.html')

@socket.on('save_configuration')
def save_configuration(new_config):
    with open('brewkit/interface/data/configurations.json') as fi:
        configs = json.load(fi)
    try:
        configs[:] = [d for d in configs if d.get(
            'id') != new_config['id']]
        configs.append(new_config)
        with open('brewkit/interface/data/configurations.json', 'w') as fi:
            json.dump(configs, fi, indent=2)
        return 'Configuration saved'
    except KeyError:
        return "Configuration needs an 'id' element"

@socket.on('get_configurations')
def serve_configurations():
    with open('brewkit/interface/data/configurations.json') as fi:
        return json.dumps(json.load(fi))


if __name__ == '__main__':
    app.debug = True
    socket.run(app)
